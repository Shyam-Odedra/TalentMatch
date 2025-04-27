import { ResumeResult } from '../types';
import { analyzeWithGemini } from './geminiAPI';

export const analyzeResumes = async (
  jobDescription: string,
  resumes: { name: string; content: string }[]
): Promise<ResumeResult[]> => {
  try {
    // Process each resume with Gemini
    const results = await Promise.all(resumes.map(async (resume) => {
      const analysis = await analyzeWithGemini(jobDescription, resume.content);
      
      return {
        name: resume.name,
        matchScore: analysis.matchScore,
        categoryScores: analysis.categoryScores,
        matchingSkills: analysis.matchingSkills,
        missingSkills: analysis.missingSkills,
        feedback: analysis.feedback,
        strengthAreas: analysis.strengthAreas,
        improvementAreas: analysis.improvementAreas
      };
    }));
    
    // Sort by match score (highest first)
    return results.sort((a, b) => b.matchScore - a.matchScore);
  } catch (error) {
    console.error('Analysis failed:', error);
    throw new Error('Failed to analyze resumes');
  }
};