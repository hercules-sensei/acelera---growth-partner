
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MoveRight, Sparkles } from 'lucide-react';

type AnimationState = 'noise' | 'transforming' | 'authority';
type Mode = 'B2B' | 'DTC';

interface Particle {
  id: number;
  text: string;
  initialX: number;
  initialY: number;
  type: 'word' | 'dot';
}

const AuthorityAnimation: React.FC<{ goToNext?: () => void }> = ({ goToNext }) => {
  const [state, setState] = useState<AnimationState>('noise');
  const [mode, setMode] = useState<Mode>('B2B');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const words = ["clicks", "impressions", "reach", "leads", "traffic", "activity", "noise", "likes", "shares", "volume"];

  const b2bPillars = [
    {
      step: "Step 01",
      title: "Get the Economics Straight",
      highlight: "No ads before the math.",
      text: "We define revenue targets, ICP, and unit economics. This sets the only thing that matters: how much you can pay to win.",
    },
    {
      step: "Step 02",
      title: "Pick the Only Motion That Matters",
      highlight: "We focus, not spray.",
      text: "We choose the acquisition motion that matches how your buyers buy—search, paid social, or outbound—and ignore the rest.",
    },
    {
      step: "Step 03",
      title: "Build a System That Converts",
      highlight: "Traffic doesn't close deals.",
      text: "We design the positioning and landing experience so every click has a job: create qualified pipeline. No fluff.",
    },
    {
      step: "Step 04",
      title: "Scale What Proves Revenue",
      highlight: "Hard decisions. Fast execution.",
      text: "We launch and measure against revenue, kill what underperforms, and scale only what closes deals. No guesswork.",
    }
  ];

  const dtcPillars = [
    {
      step: "Step 01",
      title: "Unit Economics First",
      highlight: "Profit over vanity revenue.",
      text: "We analyze contribution margins and LTV to define your real scaling ceiling. Growth is worthless without bottom-line profit.",
    },
    {
      step: "Step 02",
      title: "Creative That Commands",
      highlight: "Creative is the new targeting.",
      text: "We build scroll-stopping authority through content that resonates. We don't just 'run ads'; we build a brand ecosystem.",
    },
    {
      step: "Step 03",
      title: "Conversion Infrastructure",
      highlight: "Frictionless path to purchase.",
      text: "We optimize your storefront for maximum conversion rate, ensuring every dollar spent on traffic works twice as hard.",
    },
    {
      step: "Step 04",
      title: "Surgical Scaling",
      highlight: "Aggressive testing, data scaling.",
      text: "We scale winners quickly and kill losers ruthlessly. No guesswork—just data-backed decisions to dominate your niche.",
    }
  ];

  const currentPillars = mode === 'B2B' ? b2bPillars : dtcPillars;

  const particles: Particle[] = useMemo(() => {
    const p: Particle[] = [];
    // Reduce particles on mobile to prevent crashes
    const maxWords = isMobile ? 5 : 10;
    const maxDots = isMobile ? 5 : 20;

    words.slice(0, maxWords).forEach((word, i) => {
      p.push({
        id: i,
        text: word,
        initialX: 10 + Math.random() * 80,
        initialY: 20 + Math.random() * 60,
        type: 'word'
      });
    });
    for (let i = 0; i < maxDots; i++) {
      p.push({
        id: words.length + i,
        text: '',
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        type: 'dot'
      });
    }
    return p;
  }, [isMobile]);

  const handleApplyStrategy = () => {
    setState('transforming');
    setTimeout(() => {
      setState('authority');
    }, 1200);
  };

  return (
    <section className="relative h-full w-full overflow-hidden bg-stone-light flex items-center justify-center pt-14 md:pt-24 pb-4">
      {/* Particles background - only render if not in authority state to reduce load */}
      {state !== 'authority' && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {particles.map((p) => {
            return (
              <motion.div
                key={p.id}
                initial={false}
                animate={{
                  left: state === 'noise' ? `${p.initialX}%` : '50%',
                  top: state === 'noise' ? `${p.initialY}%` : '50%',
                  opacity: 0.4,
                  scale: state === 'noise' ? 1 : 0,
                  filter: state === 'transforming' ? 'blur(10px)' : 'blur(0px)',
                }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute whitespace-nowrap"
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                {p.type === 'word' ? (
                  <span className="text-stone-400 font-bold text-[8px] md:text-xs uppercase tracking-widest">{p.text}</span>
                ) : (
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-stone-300 rounded-full" />
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10 text-center max-w-7xl h-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {state === 'noise' && (
            <motion.div 
              key="noise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-12"
            >
              <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 md:mb-8 tracking-tighter leading-tight text-dark-charcoal">
                Targeted Precision <br />for High Impact.
              </h2>
              <p className="text-lg md:text-3xl text-stone-500 mb-8 md:mb-12 max-w-2xl mx-auto font-medium">
                Activity is not authority.
              </p>
              <button 
                onClick={handleApplyStrategy}
                className="px-8 py-4 md:px-12 md:py-6 bg-acelera-orange text-white rounded-full text-base md:text-2xl font-bold hover:bg-acelera-orange-hover transition-all shadow-2xl shadow-acelera-orange/20"
              >
                See Our Method
              </button>
            </motion.div>
          )}

          {state === 'transforming' && (
            <motion.div 
              key="transforming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl md:text-4xl font-serif italic text-stone-500 py-20"
            >
              Authority is not chased. <br className="sm:hidden"/><span className="text-dark-charcoal font-bold">It is built.</span>
            </motion.div>
          )}

          {state === 'authority' && (
            <motion.div 
              key="authority"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full h-full flex flex-col pt-0 no-scrollbar relative"
            >
              <div className="flex flex-col items-center mb-6 md:mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" fill="currentColor" className="text-acelera-orange" />
                  <Sparkles size={16} className="text-acelera-orange" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-dark-charcoal/40">The Authority Framework</span>
                </div>
                <div className="inline-flex items-center p-1 rounded-full bg-white border border-stone-200 shadow-sm">
                  <div className="flex bg-stone-50 rounded-full p-1 overflow-hidden">
                    <button 
                      onClick={() => setMode('B2B')}
                      className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${mode === 'B2B' ? 'bg-acelera-orange text-white shadow-lg' : 'text-dark-charcoal/40 hover:text-dark-charcoal/60'}`}
                    >
                      B2B
                    </button>
                    <button 
                      onClick={() => setMode('DTC')}
                      className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${mode === 'DTC' ? 'bg-acelera-orange text-white shadow-lg' : 'text-dark-charcoal/40 hover:text-dark-charcoal/60'}`}
                    >
                      DTC
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative w-full max-w-7xl mx-auto mb-2 md:mb-10 overflow-hidden">
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory px-4 md:px-0 pb-6 md:pb-10">
                  {currentPillars.map((pillar, idx) => (
                    <motion.div
                      key={`${mode}-${idx}`}
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="min-w-[85vw] md:min-w-0 snap-center bg-dark-charcoal text-white p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl min-h-[200px] md:min-h-[260px] lg:h-[340px] flex flex-col text-left relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 shadow-xl shadow-black/20"
                    >
                      <div className="absolute -right-10 -top-10 w-24 h-24 bg-acelera-orange opacity-0 group-hover:opacity-10 blur-[40px] rounded-full transition-opacity duration-500"></div>
                      
                      <div className="mb-2">
                        <span className="text-acelera-orange font-bold text-[8px] md:text-[10px] uppercase tracking-[0.3em] mb-1 block opacity-60">
                          {pillar.step}
                        </span>
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 tracking-tight leading-tight">
                          {pillar.title}
                        </h3>
                        <div className="h-[1px] w-6 bg-acelera-orange/40 mb-2 md:mb-3 group-hover:w-full transition-all duration-500"></div>
                        <p className="text-acelera-orange font-serif italic text-sm md:text-base lg:text-lg mb-1 md:mb-2 leading-snug">
                          {pillar.highlight}
                        </p>
                      </div>

                      <p className="text-stone-400 text-[11px] md:text-xs lg:text-sm leading-relaxed font-medium">
                        {pillar.text}
                      </p>

                      {/* Disable pulsing dots on mobile for better performance */}
                      <div className="absolute bottom-3 right-5 flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                         {[...Array(idx + 1)].map((_, i) => (
                           isMobile ? (
                             <div
                               key={i}
                               className="w-1 h-1 rounded-full bg-acelera-orange"
                             />
                           ) : (
                             <motion.div
                               key={i}
                               animate={{ opacity: [0.2, 1, 0.2] }}
                               transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                               className="w-1 h-1 rounded-full bg-acelera-orange"
                             />
                           )
                         ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="md:hidden text-center text-[8px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4 flex items-center justify-center gap-2">
                <MoveRight size={10} className="text-acelera-orange" />
                Swipe to explore the pillars
              </div>

              <div className="flex flex-col items-center">
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2 md:mb-6 tracking-tighter text-dark-charcoal leading-none">
                  This is <br className="sm:hidden"/><span className="relative">Acelera<span className="absolute bottom-1 left-0 w-full h-1 md:h-2 bg-acelera-orange/20 -z-10"></span></span>
                </h2>
                <p className="text-sm sm:text-xl md:text-2xl text-stone-600 mb-6 md:mb-10 max-w-4xl mx-auto leading-tight font-medium px-4">
                  Acquisition systems with direction and real weight.
                </p>
                <button 
                  onClick={goToNext}
                  className="flex items-center gap-2 md:gap-3 px-8 py-4 md:px-10 md:py-5 bg-dark-charcoal text-white rounded-full text-base md:text-lg font-bold hover:scale-105 transition-transform"
                >
                  Continue
                  <ArrowRight size={20} className="text-acelera-orange" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {state === 'authority' && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-acelera-orange/5 rounded-full blur-[60px] md:blur-[120px] -z-10"
        />
      )}
    </section>
  );
};

export default AuthorityAnimation;
