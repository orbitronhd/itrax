import { HeroBanner } from './HeroBanner';
import { UpcomingEvent } from './UpcomingEvent';
import { AboutSection } from './AboutSection';

export function HomePage() {
  return (
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      <HeroBanner />
      <UpcomingEvent />
      <AboutSection />
    </main>
  );
}
