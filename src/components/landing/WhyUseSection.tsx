import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Clock, Award, Sparkles, BarChart } from 'lucide-react';

const WhyUseSection: React.FC = () => {
  const features = [
    {
      icon: <Clock size={32} className="text-indigo-400" />,
      title: "Save Time",
      description: "Reduce screening time by up to 80% with AI-powered candidate matching.",
      delay: 0.1
    },
    {
      icon: <Fingerprint size={32} className="text-rose-400" />,
      title: "Eliminate Bias",
      description: "Objective skill-based evaluation removes unconscious bias from hiring.",
      delay: 0.2
    },
    {
      icon: <BarChart size={32} className="text-amber-400" />,
      title: "Detailed Analytics",
      description: "Get comprehensive skill matching scores and qualification breakdown.",
      delay: 0.3
    },
    {
      icon: <Award size={32} className="text-emerald-400" />,
      title: "Quality Hires",
      description: "Focus on truly qualified candidates who match your requirements.",
      delay: 0.4
    },
    {
      icon: <Sparkles size={32} className="text-violet-400" />,
      title: "Advanced AI",
      description: "Powered by cutting-edge language models for accurate assessments.",
      delay: 0.5
    }
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">
          Why Use TalentMatch
        </h2>
        <p className="text-lg text-white/60 max-w-3xl mx-auto">
          Our platform helps recruiters and hiring managers make better decisions faster.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: feature.delay,
              ease: [0.25, 0.4, 0.25, 1]
            }}
            className="p-8 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 backdrop-blur-sm"
          >
            <div className="mb-5">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
            <p className="text-white/60">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyUseSection;