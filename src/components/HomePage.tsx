import { HeroBanner } from './HeroBanner';

export function HomePage() {
  return (
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      <HeroBanner />
    </main>
  );
}
