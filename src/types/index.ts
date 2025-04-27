export interface ResumeResult {
  name: string;
  matchScore: number;
  categoryScores: {
    skills: number;
    experience: number;
    education: number;
    overall: number;
  };
  matchingSkills: string[];
  missingSkills: string[];
  feedback: string;
  strengthAreas: string[];
  improvementAreas: string[];
}