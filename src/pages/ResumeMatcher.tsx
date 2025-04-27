import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import UploadSection from '../components/matcher/UploadSection';
import ResultsSection from '../components/matcher/ResultsSection';
import { ResumeResult } from '../types';
import { analyzeResumes } from '../utils/matchingLogic';
import { useNotification } from '../contexts/NotificationContext';

const ResumeMatcher: React.FC = () => {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [resumes, setResumes] = useState<{ name: string; content: string }[]>([]);
  const [results, setResults] = useState<ResumeResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const { showNotification } = useNotification();
  
  const handleAnalyze = async () => {
    if (!jobDescription || resumes.length === 0) {
      showNotification('error', 'Please provide both a job description and at least one resume');
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // In a real app, this would call an API
      const analysisResults = await analyzeResumes(jobDescription, resumes);
      setResults(analysisResults);
      setShowResults(true);
      showNotification('success', 'Analysis completed successfully!');
    } catch (error) {
      console.error('Analysis failed:', error);
      showNotification('error', 'Something went wrong during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const resetAnalysis = () => {
    // Clear all state
    setShowResults(false);
    setJobDescription('');
    setResumes([]);
    setResults([]);
    showNotification('success', 'Ready for a new analysis!');
  };
  
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
          TalentMatch
        </h1>

        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] rounded-2xl blur-3xl" />
          
          <div className="relative z-10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {!showResults ? (
              <UploadSection 
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                resumes={resumes}
                setResumes={setResumes}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
            ) : (
              <ResultsSection 
                results={results}
                onReset={resetAnalysis}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeMatcher;