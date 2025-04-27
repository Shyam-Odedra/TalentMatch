import React from 'react';
import { BrainCircuit, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <BrainCircuit size={32} className="text-indigo-400 mr-2" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">
              TalentMatch
            </span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} TalentMatch. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;