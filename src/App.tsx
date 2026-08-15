import { CustomCursor } from './components/CustomCursor';
import { ParticleCanvas } from './components/ParticleCanvas';
import { GridBackground } from './components/GridBackground';
import { FloatingParticles } from './components/FloatingParticles';

function App() {
  return (
    <>
      <CustomCursor />
      <ParticleCanvas />
      <GridBackground />
      <FloatingParticles />
      {/* Future page content will go here */}
      <div style={{ position: 'relative', zIndex: 1, padding: '4rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1rem' }}>Welcome to iTrax</h1>
        <p style={{ color: 'var(--text-muted)' }}>Background systems are live.</p>
        <button className="btn" style={{ marginTop: '2rem', padding: '0.8rem 1.5rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'none' }}>
          Interactive Button
        </button>
      </div>
    </>
  );
}

export default App;
