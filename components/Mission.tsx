
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface MissionProps {
  goToSlide?: (index: number) => void;
}

const Mission: React.FC<MissionProps> = ({ goToSlide }) => {
  const BOOKING_URL = "https://calendar.app.google/29to7brSPsZf5huk6";

  return (
    <section className="h-full w-full flex items-center justify-center bg-stone-warm px-6 pt-8 md:pt-24 pb-6 overflow-y-auto sm:overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 mb-6 md:mb-8">
              <Sparkles className="text-acelera-orange" size={24} />
              <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] text-stone-400">Our Mission</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-10 tracking-tighter leading-[1] md:leading-[0.9]">
              Amplifying brands that <span className="text-acelera-orange">actually matter</span>.
            </h2>
            <p className="text-lg md:text-3xl text-stone-600 leading-tight font-medium max-w-xl mx-auto lg:mx-0">
              We ensure the most valuable solutions also have the most powerful voice in the market.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 md:p-20 rounded-[2rem] md:rounded-5xl border border-stone-200 shadow-2xl shadow-stone-300/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 md:p-8">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-acelera-orange rounded-full opacity-10 animate-pulse"></div>
            </div>
            
            <h3 className="text-2xl md:text-5xl font-bold mb-8 md:mb-10 leading-none tracking-tight">
              Ready to build <br className="hidden sm:block"/>your authority?
            </h3>
            <div className="flex flex-col gap-4 md:gap-6">
              <a 
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 md:py-6 bg-acelera-orange text-white font-bold rounded-2xl md:rounded-3xl hover:bg-acelera-orange-hover transition-all text-lg md:text-2xl flex items-center justify-center gap-3 group text-center"
              >
                Let's Talk
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </a>
              <button 
                onClick={() => goToSlide && goToSlide(3)}
                className="w-full py-4 md:py-6 bg-stone-light text-dark-charcoal font-bold rounded-2xl md:rounded-3xl border-2 border-stone-200 hover:bg-stone-100 transition-all text-sm md:text-xl"
              >
                See Our Method
              </button>
            </div>
            <div className="mt-8 md:mt-12 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
               <span>Real Strategy</span>
               <div className="w-1.5 h-1.5 rounded-full bg-stone-200"></div>
               <span>Real Focus</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
