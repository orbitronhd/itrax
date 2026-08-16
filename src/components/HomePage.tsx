import { HeroBanner } from './HeroBanner';
import { UpcomingEvent } from './UpcomingEvent';

export function HomePage() {
  return (
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      <HeroBanner />
      <UpcomingEvent />
    </main>
  );
}
