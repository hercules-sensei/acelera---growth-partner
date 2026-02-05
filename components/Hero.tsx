
import React, { useState, useMemo } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, MoveRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type HeroView = 'main' | 'process';
type Mode = 'B2B' | 'DTC';

const Hero: React.FC = () => {
  const [view, setView] = useState<HeroView>('main');
  const [mode, setMode] = useState<Mode>('B2B');

  const BOOKING_URL = "https://calendar.app.google/29to7brSPsZf5huk6";

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

  const noiseWords = ["clicks", "impressions", "reach", "leads", "traffic", "activity", "noise", "likes", "shares", "volume", "spam", "garbage", "clutter"];
  
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      text: noiseWords[i % noiseWords.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5
    }));
  }, []);

  return (
    <section className="h-full w-full flex items-center justify-center relative px-6 overflow-hidden pt-28 md:pt-36 pb-4">
      <div className="absolute inset-0 -z-10 brand-gradient opacity-40"></div>
      
      <AnimatePresence>
        {view === 'process' && (
          <div className="absolute inset-0 pointer-events-none z-0">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: `${p.x}%`, y: `${p.y}%`, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.3, 0], 
                  scale: [0.4, 1, 0.4],
                  x: [`${p.x}%`, '50%'],
                  y: [`${p.y}%`, '50%'],
                }}
                transition={{ duration: 2.2, delay: p.delay, ease: "easeInOut" }}
                className="absolute text-[9px] font-bold uppercase tracking-tighter text-stone-400 whitespace-nowrap"
              >
                {p.text}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl w-full relative z-10 flex flex-col justify-center h-full">
        <AnimatePresence mode="wait">
          {view === 'main' ? (
            <motion.div 
              key="main-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              {/* Toggle Section */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center p-1 mb-8 md:mb-10 rounded-full bg-white border border-stone-200 shadow-sm"
              >
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
                <div className="px-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark-charcoal/40 border-l border-stone-200 ml-1 hidden sm:block">
                  Growth Partner
                </div>
              </motion.div>
              
              <motion.h1 
                key={`${mode}-heading`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-[1.1] md:leading-[1] mb-8 md:mb-12 tracking-tighter"
              >
                Acquisition driven by <br/>
                <span className="text-acelera-orange font-serif italic font-normal">
                  {mode === 'B2B' ? 'authority' : 'performance'}
                </span>
              </motion.h1>
              
              <motion.p 
                key={`${mode}-subtext`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-2xl text-stone-600 max-w-3xl mx-auto mb-10 md:mb-16 leading-tight font-medium"
              >
                {mode === 'B2B' 
                  ? "We turn your digital presence into a system that generates real commercial conversations with the people who decide."
                  : "We turn your brand into a consumer magnet that drives recurring high-ROAS revenue through creative authority."}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
              >
                <button 
                  onClick={() => setView('process')}
                  className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-acelera-orange text-white rounded-full text-base md:text-lg font-bold flex items-center justify-center gap-2 hover:bg-acelera-orange-hover transition-all hover:scale-105 shadow-xl shadow-acelera-orange/10"
                >
                  {mode === 'B2B' ? 'See how we start commercial conversations' : 'See how we attract consumers'}
                  <ArrowRight size={20} />
                </button>
                <a 
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-transparent border-2 border-dark-charcoal text-dark-charcoal rounded-full text-base md:text-lg font-bold hover:bg-dark-charcoal hover:text-white transition-all text-center"
                >
                  Book a strategy call
                </a>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="process-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full flex flex-col pt-6 md:pt-0 no-scrollbar relative"
            >
              <div className="flex items-center justify-between mb-2 md:mb-6 max-w-6xl mx-auto w-full px-4 shrink-0">
                <button 
                  onClick={() => setView('main')}
                  className="flex items-center gap-2 text-stone-400 hover:text-dark-charcoal transition-colors font-bold uppercase tracking-widest text-[10px] md:text-xs"
                >
                  <ChevronLeft size={16} /> BACK
                </button>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-acelera-orange" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-dark-charcoal/40">Our Method</span>
                </div>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center mb-10 md:mb-8 tracking-tighter leading-none px-4 shrink-0">
                {mode === 'B2B' ? 'How We Acquire ' : 'How We Scale '} 
                <span className="relative">
                  {mode === 'B2B' ? 'Customers' : 'Brands'}
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-acelera-orange/30 -z-10"></span>
                </span>
              </h2>

              <div className="relative max-w-7xl mx-auto md:px-4 w-full flex-1 overflow-hidden min-h-0">
                {/* Acceleration Line Animation - Desktop only */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2 -z-10 pointer-events-none">
                  <svg width="100%" height="20" viewBox="0 0 1200 20" fill="none" preserveAspectRatio="none">
                    <motion.path
                      d="M 0 10 L 1200 10"
                      stroke="#FF6B00"
                      strokeWidth="1.5"
                      strokeDasharray="10 20"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{ duration: 1.5, ease: "circIn" }}
                    />
                  </svg>
                </div>

                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory px-4 md:px-0 pb-10 md:pb-0 h-full md:h-auto items-center">
                  {currentPillars.map((pillar, idx) => (
                    <motion.div
                      key={`${mode}-${idx}`}
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="min-w-[85vw] md:min-w-0 snap-center bg-dark-charcoal text-white p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl min-h-[220px] md:min-h-[260px] lg:h-[340px] flex flex-col relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 shadow-xl shadow-black/20"
                    >
                      <div className="absolute -right-10 -top-10 w-24 h-24 bg-acelera-orange opacity-0 group-hover:opacity-10 blur-[40px] rounded-full transition-opacity duration-500"></div>
                      
                      <div className="mb-2">
                        <span className="text-acelera-orange font-bold text-[8px] md:text-[10px] uppercase tracking-[0.3em] mb-1 md:mb-1 block opacity-60">
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

                      <div className="absolute bottom-3 right-5 flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                         {[...Array(idx + 1)].map((_, i) => (
                           <motion.div 
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                            className="w-1 h-1 rounded-full bg-acelera-orange"
                           />
                         ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile Swipe Hint */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="md:hidden text-center text-[8px] font-bold uppercase tracking-[0.2em] text-stone-400 mt-0 flex items-center justify-center gap-2 shrink-0"
              >
                <MoveRight size={10} className="text-acelera-orange" />
                Swipe to explore
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-center pb-8 md:pb-12 mt-4 md:mt-20 shrink-0"
              >
                <a 
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 md:px-12 md:py-6 bg-acelera-orange text-white rounded-full text-sm md:text-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto shadow-2xl shadow-acelera-orange/20"
                >
                  {mode === 'B2B' ? 'Accelerate My Growth' : 'Scale My Brand'}
                  <ArrowRight size={18} />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
