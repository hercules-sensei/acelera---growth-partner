
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Philosophy from './components/Philosophy';
import AuthorityAnimation from './components/AuthorityAnimation';
import Services from './components/Services';
import Impact from './components/Impact';
import Mission from './components/Mission';

const SLIDES = [
  { id: 'home', component: Hero },
  { id: 'problem', component: Problem },
  { id: 'philosophy', component: Philosophy },
  { id: 'authority', component: AuthorityAnimation },
  { id: 'services', component: Services },
  { id: 'impact', component: Impact },
  { id: 'mission', component: Mission },
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const touchHandled = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex || isAnimating.current) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(Math.max(0, Math.min(index, SLIDES.length - 1)));
    isAnimating.current = true;
    setTimeout(() => { isAnimating.current = false; }, 650);
  }, [currentIndex]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < 3) return;

      if (e.deltaY > 0 && currentIndex < SLIDES.length - 1) {
        goToSlide(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchHandled.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (isAnimating.current || touchHandled.current) return;
      const deltaY = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(deltaY) < 40) return;

      touchHandled.current = true;
      if (deltaY > 0 && currentIndex < SLIDES.length - 1) {
        goToSlide(currentIndex + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentIndex, goToSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      filter: 'blur(10px)',
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (direction: number) => ({
      y: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.02,
      filter: 'blur(10px)',
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const ActiveComponent = SLIDES[currentIndex].component;

  return (
    <div className={`h-screen w-screen overflow-hidden bg-stone-light selection:bg-acelera-orange selection:text-white ${!isMobile ? 'cursor-none' : ''}`} style={{ touchAction: 'none' }}>
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 z-[100] pointer-events-none"
          animate={{
            x: mousePos.x,
            y: mousePos.y,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" fill="none">
            <path d="M2,2 L2,20 L7,15 L12,22 L15,20 L10,13 L17,13 Z" fill="#FF6B00" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      )}

      <Navbar onNavClick={goToSlide} activeIndex={currentIndex} slides={SLIDES} />
      
      <main className="relative h-full w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pt-20 md:pt-24 pb-4"
          >
            <ActiveComponent 
              isActive={true} 
              goToNext={() => currentIndex < SLIDES.length - 1 && goToSlide(currentIndex + 1)} 
              goToSlide={goToSlide}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="hidden sm:flex fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goToSlide(i)}
            className={`w-1.5 h-8 rounded-full transition-all duration-500 outline-none ${
              i === currentIndex ? 'bg-acelera-orange scale-y-125' : 'bg-dark-charcoal/10 hover:bg-dark-charcoal/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
