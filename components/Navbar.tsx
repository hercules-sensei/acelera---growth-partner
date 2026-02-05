
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
                <div className="w-8 h-8 md:w-10 md:h-10 bg-acelera-orange rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-sm rotate-45"></div>
                </div>
                <span className="text-lg md:text-2xl font-bold tracking-tight uppercase whitespace-nowrap">Acelera</span>
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
                  {/* Detailed F1 Car SVG */}
                  <svg viewBox="0 0 220 80" className="w-full h-auto drop-shadow-[0_0_10px_rgba(255,107,0,0.8)]">
                    {/* Ground shadow */}
                    <ellipse cx="115" cy="74" rx="85" ry="4" fill="#000" opacity="0.12"/>
                    {/* Front wing */}
                    <path d="M2,60 L48,60 L48,56 L15,54 L10,50 L2,50 Z" fill="#1A1A1A"/>
                    <path d="M2,50 L2,46 L6,46 L10,50 Z" fill="#FF6B00"/>
                    {/* Nose cone */}
                    <path d="M40,56 L52,44 L68,38 L72,36 L72,56 Z" fill="#FF6B00"/>
                    {/* Main monocoque */}
                    <path d="M72,36 L85,30 L98,26 Q105,20 115,18 Q122,16 128,18 L132,22 L135,26 L165,30 L178,38 L180,56 L72,56 Z" fill="#FF6B00"/>
                    {/* Side accent stripe */}
                    <path d="M58,50 L176,50 L177,54 L56,54 Z" fill="white" opacity="0.12"/>
                    {/* Cockpit opening */}
                    <path d="M98,28 Q105,20 115,18 Q120,17 124,18 L124,28 Z" fill="#1A1A1A"/>
                    {/* Halo */}
                    <path d="M100,28 C106,12 120,12 124,28" stroke="#999" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    {/* Driver helmet */}
                    <ellipse cx="112" cy="22" rx="4" ry="5" fill="#FF6B00" opacity="0.5"/>
                    {/* Air intake */}
                    <path d="M126,18 L130,10 L136,10 L132,22 Z" fill="#1A1A1A"/>
                    {/* Engine cover highlight */}
                    <path d="M132,22 L148,24 L165,30 L178,38 L135,26 Z" fill="#E66000"/>
                    {/* Rear wing endplates */}
                    <path d="M188,56 L188,12 L192,12 L192,56 Z" fill="#1A1A1A"/>
                    <path d="M212,56 L212,14 L216,14 L216,56 Z" fill="#1A1A1A"/>
                    {/* Rear wing main plane */}
                    <rect x="186" y="12" width="32" height="5" rx="1.5" fill="#1A1A1A"/>
                    {/* Rear wing flap */}
                    <rect x="188" y="20" width="28" height="3.5" rx="1" fill="#FF6B00"/>
                    {/* Floor plank */}
                    <rect x="42" y="56" width="148" height="4" rx="1" fill="#333"/>
                    {/* Front wheel */}
                    <ellipse cx="55" cy="62" rx="12" ry="14" fill="#1A1A1A"/>
                    <ellipse cx="55" cy="62" rx="8" ry="10" fill="#2A2A2A"/>
                    <circle cx="55" cy="62" r="3.5" fill="#FF6B00"/>
                    {/* Rear wheel */}
                    <ellipse cx="172" cy="62" rx="14" ry="16" fill="#1A1A1A"/>
                    <ellipse cx="172" cy="62" rx="9" ry="11" fill="#2A2A2A"/>
                    <circle cx="172" cy="62" r="4" fill="#FF6B00"/>
                  </svg>
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
