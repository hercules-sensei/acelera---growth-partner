
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
  const [isMobile, setIsMobile] = useState(false);
  const currentIndexRef = useRef(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  currentIndexRef.current = currentIndex;

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigate = useCallback((nextIndex: number) => {
    const current = currentIndexRef.current;
    if (nextIndex === current || isAnimating.current) return;
    if (nextIndex < 0 || nextIndex >= SLIDES.length) return;
    setDirection(nextIndex > current ? 1 : -1);
    setCurrentIndex(nextIndex);
    isAnimating.current = true;
    setTimeout(() => { isAnimating.current = false; }, isMobile ? 500 : 700);
  }, [isMobile]);

  // Wheel handler — registered once, uses ref
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < 3) return;
      const idx = currentIndexRef.current;
      if (e.deltaY > 0) navigate(idx + 1);
      else navigate(idx - 1);
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigate]);

  // Touch handler — uses touchend for reliability, both listeners passive
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Always capture touch coordinates
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;

      // Check if we're inside a horizontally scrollable container
      const target = e.target as HTMLElement;
      const scrollContainer = target.closest('.overflow-x-auto, .snap-x');

      // If in scroll container, check if the container actually scrolled
      if (scrollContainer) {
        const scrolled = scrollContainer.scrollLeft !== 0 &&
                        scrollContainer.scrollLeft !== scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (scrolled) return; // User was scrolling horizontally, don't navigate
      }

      // Rest of navigation logic remains the same
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - endY;
      const deltaX = touchStartX.current - endX;
      if (Math.abs(deltaX) > Math.abs(deltaY)) return;
      if (Math.abs(deltaY) < 50) return;
      const idx = currentIndexRef.current;
      if (deltaY > 0) navigate(idx + 1);
      else navigate(idx - 1);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate]);

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      filter: isMobile ? 'blur(0px)' : 'blur(10px)', // No blur on mobile
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: isMobile ? 0.4 : 0.6, // Faster on mobile
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (direction: number) => ({
      y: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.02,
      filter: isMobile ? 'blur(0px)' : 'blur(10px)', // No blur on mobile
      transition: {
        duration: isMobile ? 0.4 : 0.6, // Faster on mobile
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const ActiveComponent = SLIDES[currentIndex].component;

  return (
    <div className="h-screen w-screen overflow-hidden bg-stone-light selection:bg-acelera-orange selection:text-white">

      <Navbar onNavClick={navigate} activeIndex={currentIndex} slides={SLIDES} />

      <main className="relative h-full w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
          >
            <ActiveComponent
              isActive={true}
              goToNext={() => navigate(currentIndexRef.current + 1)}
              goToSlide={navigate}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="hidden sm:flex fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => navigate(i)}
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
