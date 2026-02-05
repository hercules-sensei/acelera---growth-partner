
import React from 'react';
import { motion } from 'framer-motion';

const Impact: React.FC = () => {
  return (
    <section className="h-full w-full flex items-center justify-center bg-white px-6 pt-24 pb-12 overflow-y-auto sm:overflow-hidden">
      <div className="container mx-auto max-w-6xl text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-3xl sm:text-6xl md:text-8xl font-bold mb-8 md:mb-16 tracking-tighter leading-tight"
        >
          Driven by <br/><span className="text-stone-300">real results</span>
        </motion.h2>
        
        <div className="space-y-8 md:space-y-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-4xl md:text-6xl font-serif text-dark-charcoal italic leading-tight"
          >
            "We transform marketing budgets into undeniable market leadership."
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-3xl text-stone-500 leading-relaxed max-w-4xl mx-auto font-medium"
          >
            When the strategy is precise, growth stops being an objective and starts being an inevitable outcome.
          </motion.p>
        </div>
        
        <div className="mt-12 md:mt-24 flex flex-wrap justify-center gap-6 md:gap-16 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000">
           <span className="text-xl md:text-3xl font-black tracking-tighter uppercase">Velocity</span>
           <span className="text-xl md:text-3xl font-black tracking-tighter uppercase">DirectFlow</span>
           <span className="text-xl md:text-3xl font-black tracking-tighter uppercase">ApexBrands</span>
           <span className="text-xl md:text-3xl font-black tracking-tighter uppercase">Core_Growth</span>
        </div>
      </div>
    </section>
  );
};

export default Impact;
