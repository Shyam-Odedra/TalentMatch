import React from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import HowItWorks from '../components/landing/HowItWorks';
import WhyUseSection from '../components/landing/WhyUseSection';
import Footer from '../components/landing/Footer';
import { BrainCircuit } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <div className="relative">
        <HeroGeometric 
          badge="AI-Powered Talent Matching"
          title1="Find Your Perfect"
          title2="Candidate Faster"
          description="Upload a job description, add resumes, and let our AI matching engine find the most qualified candidates in seconds."
        />
      </div>
        
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center mb-16">
          <BrainCircuit size={42} className="text-indigo-400" />
          <h1 className="text-3xl md:text-4xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">
            TalentMatch
          </h1>
        </div>
        
        <HowItWorks />
        <WhyUseSection />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;