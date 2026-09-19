import { useState, useEffect } from 'react';

const DAMPEN_FACTOR = 0.7;

export function useNormalizedScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(1000);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Detect if desktop (fine pointer and hover capability)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    const handleResize = () => setVh(window.innerHeight);
    
    handleScroll();
    handleResize();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // For the cinematic zone (0 to roughly 4vh), we dampen the scroll on desktop.
  // Beyond that, we don't need dampening as it's standard scrolling.
  // The actual scroll wrapper height will be larger on desktop to compensate.
  const normalizedScrollY = isDesktop ? scrollY * DAMPEN_FACTOR : scrollY;

  return { scrollY, normalizedScrollY, vh, isDesktop };
}
