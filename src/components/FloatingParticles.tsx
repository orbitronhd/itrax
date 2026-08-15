import './FloatingParticles.css';

export function FloatingParticles() {
  return (
    <div className="particles">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  );
}
