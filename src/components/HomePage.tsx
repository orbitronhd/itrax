import { useState, useEffect } from 'react';
import { HeroBanner } from './HeroBanner';
import { UpcomingEvent } from './UpcomingEvent';
import { AboutSection } from './AboutSection';
import eventsHeaderImg from '../assets/header/events.webp';

export function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(1000);

  useEffect(() => {
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fade out sticky container from 4.2vh to 5vh to reveal Rest of Page
  const stickyFadeOut = Math.max(0, Math.min(1, (scrollY - 4.2 * vh) / (0.8 * vh)));
  const stickyOpacity = 1 - stickyFadeOut;

  return (
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      {/* Cinematic scroll wrapper: 100vw to break out of 1280px container */}
      <div style={{ 
        height: '600vh', 
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        zIndex: 10
      }}>
        <div style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--bg-primary)',
            opacity: stickyOpacity,
            pointerEvents: stickyOpacity > 0.5 ? 'auto' : 'none'
          }}>
            <HeroBanner imageUrl={eventsHeaderImg} scrollY={scrollY} vh={vh} />
            <UpcomingEvent scrollY={scrollY} vh={vh} />
          </div>
        </div>
      </div>
      
      {/* Rest of page overlaps by 100vh, so at scrollY = 400vh, its top is at the bottom of the viewport, scrolling up perfectly during the fade-out */}
      <div style={{ marginTop: '-100vh', position: 'relative', zIndex: 2 }}>
        <AboutSection />
      </div>
    </main>
  );
}
