import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 md:py-32 min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-6">
          <BrainCircuit size={48} className="text-blue-400" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            JobMatch AI
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          Find Your Perfect Candidate Faster with AI
        </h2>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-300">
          Upload a JD, upload resumes, get instant smart matching insights. Save hours of screening time.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/app"
            className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;