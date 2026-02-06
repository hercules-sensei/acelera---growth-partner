import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  return (
    <section className="h-full w-full flex items-center justify-center px-4 md:px-12 pt-14 md:pt-24 pb-6 overflow-y-auto sm:overflow-hidden">
      <motion.div 
        layoutId="phil-card"
        className="bg-dark-charcoal text-white rounded-[2rem] md:rounded-5xl w-full max-w-7xl min-h-[70vh] flex items-center p-8 md:p-24 relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-48 md:w-96 h-48 md:h-96 bg-acelera-orange opacity-20 blur-[80px] md:blur-[120px] rounded-full"></div>
        
        <div className="max-w-4xl relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-8 md:mb-12 tracking-tighter text-white leading-[1.1]"
          >
            Acquisition is not <br className="hidden sm:block"/>a numbers game
          </motion.h2>
          
          <div className="space-y-6 md:space-y-10">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-2xl md:text-4xl text-stone-300 leading-tight font-light"
            >
              At <span className="text-acelera-orange font-bold">Acelera</span>, we don't believe in chasing empty clicks, impressions, or vanity metrics.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-xl md:text-2xl text-stone-500 leading-relaxed max-w-2xl"
            >
              We believe in strategy, precision, and authority as the foundation for building acquisition systems that generate real opportunities, not just noise.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Philosophy;