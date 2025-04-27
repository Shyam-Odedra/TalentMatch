import React from 'react';
import { FileText, Upload, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Upload Job Description',
      description: 'Add the detailed job requirements that you\'re hiring for.',
      icon: <FileText size={32} className="text-indigo-400" />,
      delay: 0.1
    },
    {
      title: 'Add Resumes',
      description: 'Upload multiple candidate resumes that you want to evaluate.',
      icon: <Upload size={32} className="text-rose-400" />,
      delay: 0.3
    },
    {
      title: 'Get Instant Results',
      description: 'Our AI analyzes and ranks candidates based on skill match and qualifications.',
      icon: <Zap size={32} className="text-amber-400" />,
      delay: 0.5
    }
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">
          How It Works
        </h2>
        <p className="text-lg text-white/60 max-w-3xl mx-auto">
          Our advanced AI algorithm matches candidates to your job requirements in seconds, saving you hours of manual screening.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: step.delay,
              ease: [0.25, 0.4, 0.25, 1]
            }}
            className="relative p-8 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 backdrop-blur-sm"
          >
            <div className="absolute -top-4 -left-4 p-3 rounded-full bg-[#030303] border border-white/10">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 mt-6 text-white">
              {step.title}
            </h3>
            <p className="text-white/60 mb-6">
              {step.description}
            </p>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                <ArrowRight className="text-indigo-500/50" size={24} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;