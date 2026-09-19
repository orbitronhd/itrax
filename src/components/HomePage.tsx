import { HeroBanner } from './HeroBanner';
import { UpcomingEvent } from './UpcomingEvent';
import { AboutSection } from './AboutSection';
import { useNormalizedScroll } from '../hooks/useNormalizedScroll';
import eventsHeaderImg from '../assets/polaroid/events.webp';

export function HomePage() {
  const { normalizedScrollY, vh, isDesktop } = useNormalizedScroll();

  // The wrapper height is larger on desktop to compensate for dampening
  // 420vh / 0.7 = 600vh
  const wrapperHeight = isDesktop ? '600vh' : '420vh';

  // Fade out sticky container from 2.6vh to 3.2vh to reveal Rest of Page
  // We use normalizedScrollY for the timing logic
  const stickyFadeOut = Math.max(0, Math.min(1, (normalizedScrollY - 2.6 * vh) / (0.6 * vh)));
  const stickyOpacity = 1 - stickyFadeOut;

  return (
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      {/* Cinematic scroll wrapper: 100vw to break out of 1280px container */}
      <div style={{ 
        height: wrapperHeight, 
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <div style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--bg-primary)',
            opacity: stickyOpacity,
            pointerEvents: stickyOpacity > 0.5 ? 'auto' : 'none'
          }}>
            <HeroBanner imageUrl={eventsHeaderImg} scrollY={normalizedScrollY} vh={vh} />
            <UpcomingEvent scrollY={normalizedScrollY} vh={vh} />
          </div>
        </div>
      </div>
      
      {/* Rest of page overlaps by 100vh, so at scrollY = 240vh, its top is at the bottom of the viewport, scrolling up perfectly during the fade-out */}
      <div style={{ marginTop: '-100vh', position: 'relative', zIndex: 2 }}>
        <AboutSection />
      </div>
    </main>
  );
}
