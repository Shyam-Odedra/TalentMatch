import React, { useState, useRef } from 'react';
import { Upload, FileText, X, Loader2, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { parsePDF } from '../../utils/parsePDF';
import { useNotification } from '../../contexts/NotificationContext';

interface UploadSectionProps {
  jobDescription: string;
  setJobDescription: (text: string) => void;
  resumes: { name: string; content: string }[];
  setResumes: (resumes: { name: string; content: string }[]) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  jobDescription,
  setJobDescription,
  resumes,
  setResumes,
  onAnalyze,
  isAnalyzing
}) => {
  const resumeRef = useRef<HTMLInputElement>(null);
  const [dropActive, setDropActive] = useState<boolean>(false);
  const { showNotification } = useNotification();
  
  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };
  
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Check for maximum 5 resumes
    if (resumes.length + files.length > 5) {
      showNotification('error', "Maximum 5 resumes allowed. Please remove some resumes before adding more.");
      return;
    }
    
    await processResumeFiles(Array.from(files));
    
    if (resumeRef.current) {
      resumeRef.current.value = '';
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropActive(true);
  };
  
  const handleDragLeave = () => {
    setDropActive(false);
  };
  
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropActive(false);
    
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    // Check for maximum 5 resumes
    if (resumes.length + files.length > 5) {
      showNotification('error', "Maximum 5 resumes allowed. Please remove some resumes before adding more.");
      return;
    }
    
    await processResumeFiles(Array.from(files));
  };
  
  const processResumeFiles = async (files: File[]) => {
    try {
      const newResumes = await Promise.all(
        files.map(async (file) => {
          let content = '';
          if (file.type === 'application/pdf') {
            content = await parsePDF(file);
          } else {
            content = await readFileAsText(file);
          }
          return { name: file.name, content };
        })
      );
      
      setResumes([...resumes, ...newResumes]);
    } catch (error) {
      console.error('Failed to process resume files:', error);
      showNotification('error', 'Something went wrong processing resume files. Please try again with different files.');
    }
  };
  
  const removeResume = (index: number) => {
    const updatedResumes = [...resumes];
    updatedResumes.splice(index, 1);
    setResumes(updatedResumes);
  };
  
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };
  
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Job Description Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2 text-indigo-400" size={20} />
            Job Description
          </h2>
          
          <div className="mb-4 border-rose-400 bg-gradient-to-r from-indigo-500/10 to-rose-500/10 p-[2px] rounded-lg">
            <textarea
              className="w-full h-64 bg-[#030303] rounded-lg p-4 text-white placeholder-white/30 focus:outline-none  
              scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent"
              placeholder="Paste your job description here..."
              value={jobDescription}
              onChange={handleJobDescriptionChange}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(79, 70, 229, 0.5) transparent'
              }}
            />
          </div>
        </div>
        
        {/* Resumes Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2 text-rose-400" size={20} />
            Resumes
          </h2>
          
          <div className="mb-2 flex items-center text-white/60 text-sm px-1">
            <Info size={14} className="mr-1 text-indigo-400" />
            <span>Maximum 5 resumes allowed. 1-2 page resumes recommended for best results.</span>
          </div>
          
          <div
            className={`mb-4 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dropActive
                ? 'border-indigo-400 bg-indigo-900/10'
                : 'border-white/20 bg-white/[0.03] hover:bg-white/[0.05]'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className={`mx-auto mb-2 ${dropActive ? 'text-indigo-400' : 'text-white/40'}`} size={32} />
            <p className="text-white/60 mb-2">Drag & drop resume files here</p>
            <p className="text-sm text-white/40 mb-4">Supports: PDF, DOCX</p>
            
            <label className="cursor-pointer inline-flex items-center bg-gradient-to-r from-indigo-500 to-rose-500 rounded-lg px-4 py-2 text-white hover:shadow-lg transition-all">
              <Upload size={16} className="mr-2" />
              <span>Browse Files</span>
              <input
                type="file"
                ref={resumeRef}
                onChange={handleResumeUpload}
                accept=".txt,.pdf,.docx"
                multiple
                className="hidden"
              />
            </label>
          </div>
          
          {resumes.length > 0 && (
            <div className="border border-white/10 rounded-lg bg-white/[0.02] p-4">
              <h3 className="text-sm uppercase tracking-wider text-white/40 mb-3">
                Uploaded Resumes ({resumes.length}/5)
              </h3>
              
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rose-600 scrollbar-track-transparent">
                {resumes.map((resume, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.03]"
                  >
                    <div className="flex items-center">
                      <FileText size={16} className="mr-2 text-white/40" />
                      <span className="text-sm text-white/80 truncate max-w-[200px]">
                        {resume.name}
                      </span>
                    </div>
                    <button
                      onClick={() => removeResume(index)}
                      className="text-white/40 hover:text-rose-400 focus:outline-none"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing || !jobDescription || resumes.length === 0}
          className={`
            inline-flex items-center justify-center rounded-full
            px-8 py-3 text-lg font-medium shadow-lg
            transition-all duration-300 transform 
            ${
              isAnalyzing || !jobDescription || resumes.length === 0
                ? 'bg-gray-600 text-white/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-rose-500 text-white hover:shadow-xl hover:scale-105 active:scale-95'
            }
          `}
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={20} className="mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Resumes'
          )}
        </button>
        
        {(!jobDescription || resumes.length === 0) && (
          <p className="mt-4 text-white/40 text-sm">
            Please provide both a job description and at least one resume to proceed.
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadSection;