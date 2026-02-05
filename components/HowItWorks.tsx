import React from 'react';
import { Target, MessageSquare, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "1. Position",
    title: "Strategic Clarity",
    text: "We define a positioning that connects your offer with your market's needs.",
    icon: <Target className="text-acelera-orange" size={32} />
  },
  {
    number: "2. Activate",
    title: "Conversations",
    text: "We design a system that generates a constant flow of qualified meetings.",
    icon: <MessageSquare className="text-acelera-orange" size={32} />
  },
  {
    number: "3. Scale",
    title: "Real Growth",
    text: "We integrate processes so your commercial team can grow without friction.",
    icon: <TrendingUp className="text-acelera-orange" size={32} />
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="h-full w-full flex items-center justify-center bg-white px-6 pt-24 pb-12 overflow-y-auto sm:overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-4 md:mb-6"
          >
            Our Method
          </motion.h2>
          <p className="text-stone-500 text-lg md:text-3xl font-medium">A proven framework for mature systems.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 bg-stone-light rounded-2xl md:rounded-4xl flex items-center justify-center mb-6 md:mb-10 group-hover:bg-acelera-orange/10 transition-colors duration-500 border border-stone-100">
                {step.icon}
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-4 md:mb-6">{step.number}</span>
              <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">{step.title}</h3>
              <p className="text-stone-600 text-sm md:text-xl leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;