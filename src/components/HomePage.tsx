export function HomePage() {
  return (
    <main style={{ flex: 1, position: 'relative', zIndex: 1, padding: '4rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div>
        <h1 style={{ marginBottom: '1rem' }}>Welcome to iTrax</h1>
        <p style={{ color: 'var(--text-muted)' }}>Background systems and Navbar are live.</p>
        <button className="btn" style={{ marginTop: '2rem', padding: '0.8rem 1.5rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'none' }}>
          Interactive Button
        </button>
      </div>
    </main>
  );
}
