
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Zap } from 'lucide-react';

interface NavbarProps {
  onNavClick: (index: number) => void;
  activeIndex: number;
  slides: Array<{ id: string }>;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, activeIndex, slides }) => {
  const [raceState, setRaceState] = useState<'idle' | 'falling' | 'bouncing' | 'racing' | 'done'>('idle');
  const [logoRevealed, setLogoRevealed] = useState(false);

  const getIndexById = (id: string) => slides.findIndex(s => s.id === id);

  const startIntroRace = () => {
    if (raceState !== 'idle') return;
    setRaceState('falling');
  };

  const handleAnimationComplete = (definition: any) => {
    if (raceState === 'falling') {
      setRaceState('racing');
    } else if (raceState === 'racing') {
      setRaceState('done');
      setLogoRevealed(true);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 md:py-10 transition-all duration-300 bg-transparent">
      <div className="container mx-auto px-6 md:px-16 flex justify-between items-center relative h-10 md:h-12">
        {/* Logo / Race Button Container */}
        <div className="relative flex items-center gap-2 md:gap-3 shrink-0 h-full">
          <AnimatePresence mode="wait">
            {!logoRevealed && raceState === 'idle' ? (
              <motion.button
                key="start-btn"
                onClick={startIntroRace}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="group flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 bg-acelera-orange text-white rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-transform"
              >
                <Play size={14} fill="currentColor" />
                START RACE
              </motion.button>
            ) : logoRevealed && (
              <motion.button 
                key="final-logo"
                onClick={() => onNavClick(0)}
                initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                className="flex items-center gap-2 md:gap-3 group"
              >
                <img src="/logo.png" alt="Acelera" className="h-6 md:h-8 w-auto transition-transform group-hover:scale-105" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Miniature F1 Car Animation */}
          <AnimatePresence>
            {raceState !== 'idle' && raceState !== 'done' && (
              <motion.div
                className="absolute left-0 pointer-events-none z-50 flex items-center justify-center"
                initial={{ y: -500, x: 0, opacity: 1 }}
                animate={
                  raceState === 'falling' 
                    ? { y: 0, x: 0 } 
                    : { x: '100vw', y: 0 }
                }
                transition={
                  raceState === 'falling'
                    ? { type: 'spring', damping: 10, stiffness: 100, mass: 1 }
                    : { duration: 0.8, ease: [0.7, 0, 0.3, 1] }
                }
                onAnimationComplete={handleAnimationComplete}
              >
                <div className="relative w-20 md:w-32 flex items-center">
                  {raceState === 'racing' && (
                    <div className="absolute -left-14 flex gap-1 items-center">
                       <Zap className="text-acelera-orange w-4 h-4 fill-acelera-orange animate-pulse" />
                       <Zap className="text-acelera-orange w-3 h-3 fill-acelera-orange animate-pulse opacity-60" />
                    </div>
                  )}
                  <img
                    src="/f1-car.png"
                    alt="F1 Car"
                    className="w-full h-auto drop-shadow-[0_0_10px_rgba(255,107,0,0.8)]"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  {/* Trail effects when racing */}
                  {raceState === 'racing' && (
                    <>
                      <motion.div
                        className="absolute left-0 h-full bg-gradient-to-r from-transparent to-acelera-orange/20 blur-xl w-36 -translate-x-full"
                      />
                      <motion.div
                        className="absolute -left-8 top-1/2 -translate-y-1/2 w-10 h-1 bg-acelera-orange/40 blur-sm rounded-full"
                        animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [1, 1.3, 1] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                      />
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="hidden lg:flex items-center gap-14 text-base font-bold uppercase tracking-widest opacity-80">
          <button 
            onClick={() => onNavClick(getIndexById('authority'))} 
            className={`hover:opacity-100 transition-opacity ${activeIndex === getIndexById('authority') ? 'text-dark-charcoal opacity-100' : ''}`}
          >
            Our Method
          </button>
          <button 
            onClick={() => onNavClick(getIndexById('services'))} 
            className={`hover:opacity-100 transition-opacity ${activeIndex === getIndexById('services') ? 'text-dark-charcoal opacity-100' : ''}`}
          >
            Services
          </button>
          <button 
            onClick={() => onNavClick(getIndexById('philosophy'))} 
            className={`hover:opacity-100 transition-opacity ${activeIndex === getIndexById('philosophy') ? 'text-dark-charcoal opacity-100' : ''}`}
          >
            Philosophy
          </button>
        </div>

        <a 
          href="https://calendar.app.google/29to7brSPsZf5huk6"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 md:px-8 md:py-3.5 bg-dark-charcoal text-white rounded-full text-[10px] md:text-base font-bold uppercase tracking-widest hover:scale-105 transition-transform shrink-0"
        >
          Book Call
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
