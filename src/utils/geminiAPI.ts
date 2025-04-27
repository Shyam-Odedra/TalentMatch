import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_API_KEY);

export async function analyzeWithGemini(jobDescription: string, resumeContent: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
      Analyze this resume against the job description thoroughly and objectively.
      
      Provide a detailed evaluation including:
      1. Overall match score from 0-100 
      2. Categorized scores for: skills match (0-100), experience relevance (0-100), education fit (0-100)
      3. List of matching skills found in both the resume and job description (be specific)
      4. List of required skills mentioned in the job description but missing from the resume
      5. Detailed feedback about the candidate's fit for the position
      6. 2-3 key strength areas of the candidate relevant to this role
      7. 2-3 improvement areas for better job fit
      
      Job Description:
      ${jobDescription}
      
      Resume:
      ${resumeContent}
      
      Format the response as a valid JSON object with these exact keys:
      {
        "matchScore": number,
        "categoryScores": {
          "skills": number,
          "experience": number,
          "education": number,
          "overall": number
        },
        "matchingSkills": string[],
        "missingSkills": string[],
        "feedback": string,
        "strengthAreas": string[],
        "improvementAreas": string[]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const jsonStartIndex = text.indexOf('{');
      const jsonEndIndex = text.lastIndexOf('}') + 1;
      
      if (jsonStartIndex === -1 || jsonEndIndex === 0) {
        throw new Error('Could not find valid JSON in response');
      }
      
      const jsonText = text.substring(jsonStartIndex, jsonEndIndex);
      const parsedResponse = JSON.parse(jsonText);
      
      // Validate response structure
      const validatedResponse = {
        matchScore: Number(parsedResponse.matchScore) || 0,
        categoryScores: {
          skills: Number(parsedResponse.categoryScores?.skills) || 0,
          experience: Number(parsedResponse.categoryScores?.experience) || 0,
          education: Number(parsedResponse.categoryScores?.education) || 0,
          overall: Number(parsedResponse.categoryScores?.overall) || 0
        },
        matchingSkills: Array.isArray(parsedResponse.matchingSkills) ? parsedResponse.matchingSkills : [],
        missingSkills: Array.isArray(parsedResponse.missingSkills) ? parsedResponse.missingSkills : [],
        feedback: parsedResponse.feedback || "No feedback provided",
        strengthAreas: Array.isArray(parsedResponse.strengthAreas) ? parsedResponse.strengthAreas : [],
        improvementAreas: Array.isArray(parsedResponse.improvementAreas) ? parsedResponse.improvementAreas : []
      };
      
      return validatedResponse;
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      console.error('Raw response:', text);
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}