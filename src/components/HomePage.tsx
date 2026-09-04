import { HeroBanner } from './HeroBanner';
import { UpcomingEvent } from './UpcomingEvent';
import { AboutSection } from './AboutSection';
import eventsHeaderImg from '../assets/header/events.webp';

export function HomePage() {
  return (
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      <HeroBanner imageUrl={eventsHeaderImg} />
      <UpcomingEvent />
      <AboutSection />
    </main>
  );
}
