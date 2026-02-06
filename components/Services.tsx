import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  "Positioning Strategy",
  "B2B & DTC Acquisition Systems",
  "CRM Process Integration",
  "Direct Sales Advising"
];

const Services: React.FC = () => {
  return (
    <section className="h-full w-full flex items-center justify-center bg-stone-light px-6 pt-14 md:pt-24 pb-6 overflow-y-auto sm:overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-6 md:mb-10 leading-[1.1] md:leading-[0.9]"
            >
              Every project is <span className="text-stone-400 font-serif italic">bespoke</span>
            </motion.h2>
            <p className="text-lg md:text-3xl text-stone-600 leading-tight mb-8 md:mb-12 font-medium">
              We don't sell generic packages. We build the strategic infrastructure your brand needs to scale.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-6">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center border border-stone-200 shrink-0">
                  <div className="w-2 md:w-3 h-2 md:h-3 bg-acelera-orange rounded-full animate-ping"></div>
               </div>
               <p className="text-[10px] md:text-lg font-bold text-dark-charcoal uppercase tracking-widest text-left">
                  Limited slots: 2 active projects max.
               </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full grid gap-4 md:gap-6">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-4xl border border-stone-200 hover:border-acelera-orange transition-all flex items-center gap-4 md:gap-6 group shadow-sm hover:shadow-xl"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-acelera-orange/10 transition-colors shrink-0">
                  <CheckCircle2 className="text-stone-300 group-hover:text-acelera-orange transition-colors" size={20} />
                </div>
                <span className="text-lg md:text-2xl font-bold tracking-tight">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;