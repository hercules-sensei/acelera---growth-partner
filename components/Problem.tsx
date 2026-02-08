import React from 'react';
import { motion } from 'framer-motion';

const Problem: React.FC = () => {
  return (
    <section className="h-full w-full flex items-center justify-center bg-stone-warm px-6 pt-8 md:pt-24 pb-6 overflow-y-auto sm:overflow-hidden">
      <div className="max-w-6xl w-full">
        <motion.h2 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-bold mb-10 md:mb-16 tracking-tighter leading-[1] md:leading-[0.95] text-dark-charcoal"
        >
          Market attention moves <br/>
          <span className="text-acelera-orange/30">faster</span> than traditional <br/>
          outreach
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-24 items-start">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl text-dark-charcoal font-serif italic leading-tight"
          >
            Today, the winner isn't who has the best product, but who gets the market to understand their value with clarity.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed font-medium"
          >
            Most B2B and DTC brands don't fail because of a lack of quality, but because their message doesn't cut through the noise to reach the right people.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Problem;