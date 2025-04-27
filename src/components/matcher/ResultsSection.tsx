import React from 'react';
import { BarChart, CheckCircle, XCircle, ArrowDownCircle, Trophy, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResumeResult } from '../../types';

interface ResultsSectionProps {
  results: ResumeResult[];
  onReset: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const confetti = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Helper function to get score color class
const getScoreColorClass = (score: number) => {
  if (score >= 80) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-red-400';
};

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, onReset }) => {
  const topCandidate = results[0];
  const otherCandidates = results.slice(1);
  
  return (
    <div className="max-w-5xl mx-auto my-8">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analysis Results</h2>
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          New Analysis
        </button>
      </div>
      
      {topCandidate && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="mb-8"
        >
          <motion.div
            variants={confetti}
            className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/30 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Trophy className="text-yellow-400 mr-2" size={24} />
                  <h3 className="text-2xl font-bold">Top Match</h3>
                </div>
                <div className="flex items-center bg-gray-800/50 px-4 py-2 rounded-full">
                  <BarChart size={18} className="mr-2 text-blue-400" />
                  <span className={`text-lg font-bold ${getScoreColorClass(topCandidate.matchScore)}`}>
                    {topCandidate.matchScore}% Match
                  </span>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold mb-4">{topCandidate.name}</h4>
              
              {/* Category Scores */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Overall</h5>
                  <div className="flex items-center">
                    <div className={`font-bold text-lg ${getScoreColorClass(topCandidate.categoryScores.overall)}`}>
                      {topCandidate.categoryScores.overall}%
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Skills</h5>
                  <div className="flex items-center">
                    <div className={`font-bold text-lg ${getScoreColorClass(topCandidate.categoryScores.skills)}`}>
                      {topCandidate.categoryScores.skills}%
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Experience</h5>
                  <div className="flex items-center">
                    <div className={`font-bold text-lg ${getScoreColorClass(topCandidate.categoryScores.experience)}`}>
                      {topCandidate.categoryScores.experience}%
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-1">Education</h5>
                  <div className="flex items-center">
                    <div className={`font-bold text-lg ${getScoreColorClass(topCandidate.categoryScores.education)}`}>
                      {topCandidate.categoryScores.education}%
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <CheckCircle size={14} className="mr-1 text-green-400" /> 
                  Matching Skills
                </h5>
                <div className="flex flex-wrap gap-2">
                  {topCandidate.matchingSkills.map((skill, i) => (
                    <span key={i} className="bg-green-900/40 text-green-300 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <XCircle size={14} className="mr-1 text-red-400" /> 
                  Missing Skills
                </h5>
                <div className="flex flex-wrap gap-2">
                  {topCandidate.missingSkills.map((skill, i) => (
                    <span key={i} className="bg-red-900/40 text-red-300 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Strength Areas */}
              <div className="mb-4">
                <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <Zap size={14} className="mr-1 text-yellow-400" /> 
                  Key Strengths
                </h5>
                <div className="space-y-2">
                  {topCandidate.strengthAreas.map((strength, i) => (
                    <div key={i} className="bg-yellow-900/20 border border-yellow-900/30 rounded-lg p-2 text-yellow-100 text-sm">
                      {strength}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Improvement Areas */}
              <div className="mb-4">
                <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <TrendingUp size={14} className="mr-1 text-blue-400" /> 
                  Areas for Improvement
                </h5>
                <div className="space-y-2">
                  {topCandidate.improvementAreas.map((area, i) => (
                    <div key={i} className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-2 text-blue-100 text-sm">
                      {area}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                  <ArrowDownCircle size={14} className="mr-1 text-blue-400" /> 
                  Detailed Feedback
                </h5>
                <p className="text-gray-300">
                  {topCandidate.feedback}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {otherCandidates.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Other Candidates</h3>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {otherCandidates.map((result, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden transition-all hover:bg-white/15"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold truncate">{result.name}</h4>
                    <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
                      <BarChart size={16} className="mr-1 text-blue-400" />
                      <span className={`font-bold ${getScoreColorClass(result.matchScore)}`}>
                        {result.matchScore}% Match
                      </span>
                    </div>
                  </div>
                  
                  {/* Category Scores (Mini version) */}
                  <div className="mb-4 grid grid-cols-4 gap-2">
                    <div className="bg-gray-800/30 rounded-lg p-2">
                      <h5 className="text-xs text-gray-400">Overall</h5>
                      <div className={`font-bold text-sm ${getScoreColorClass(result.categoryScores.overall)}`}>
                        {result.categoryScores.overall}%
                      </div>
                    </div>
                    <div className="bg-gray-800/30 rounded-lg p-2">
                      <h5 className="text-xs text-gray-400">Skills</h5>
                      <div className={`font-bold text-sm ${getScoreColorClass(result.categoryScores.skills)}`}>
                        {result.categoryScores.skills}%
                      </div>
                    </div>
                    <div className="bg-gray-800/30 rounded-lg p-2">
                      <h5 className="text-xs text-gray-400">Exp</h5>
                      <div className={`font-bold text-sm ${getScoreColorClass(result.categoryScores.experience)}`}>
                        {result.categoryScores.experience}%
                      </div>
                    </div>
                    <div className="bg-gray-800/30 rounded-lg p-2">
                      <h5 className="text-xs text-gray-400">Edu</h5>
                      <div className={`font-bold text-sm ${getScoreColorClass(result.categoryScores.education)}`}>
                        {result.categoryScores.education}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                      <CheckCircle size={14} className="mr-1 text-green-400" /> 
                      Matching Skills
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {result.matchingSkills.map((skill, i) => (
                        <span key={i} className="bg-green-900/40 text-green-300 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                      <XCircle size={14} className="mr-1 text-red-400" /> 
                      Missing Skills
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {result.missingSkills.map((skill, i) => (
                        <span key={i} className="bg-red-900/40 text-red-300 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Strength Area (abbreviated) */}
                  <div className="mb-4">
                    <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                      <Zap size={14} className="mr-1 text-yellow-400" /> 
                      Key Strength
                    </h5>
                    <div className="bg-yellow-900/20 border border-yellow-900/30 rounded-lg p-2 text-yellow-100 text-xs">
                      {result.strengthAreas[0] || "None identified"}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm uppercase tracking-wider text-gray-400 mb-2 flex items-center">
                      <ArrowDownCircle size={14} className="mr-1 text-blue-400" /> 
                      Feedback
                    </h5>
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {result.feedback}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;