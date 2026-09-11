import { execomData } from '../data/execomData';
import { FlipCard } from './FlipCard';
import './css/ExecomPage.css';

export function ExecomPage() {
  const renderGroup = (groupName: string) => {
    const group = execomData.find((g) => g.name === groupName);
    if (!group) return null;

    const groupClass = `group-${group.name.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div 
        key={group.name} 
        className={`team-group ${groupClass}`}
        style={{ flex: group.members.length, minWidth: 0 }}
      >
        <div className="team-group-header">
          <h2>{group.name}</h2>
          <span className="accent-line"></span>
        </div>
        
        <div className="flip-grid" role="list">
          {group.members.map((member) => (
            <FlipCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      <section className="execom-section" aria-label="Executive Committee Members" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--text)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>Executive Committee</h1>
          <p style={{ color: 'var(--accent-bright)', fontSize: '1rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Meet the minds behind iTrax</p>
        </div>
        <div className="execom-container">
          {renderGroup('Faculty Incharge')}
          {renderGroup('Core Committee')}
          
          <div className="team-row">
            {renderGroup('Documentation')}
            {renderGroup('Creative')}
          </div>
          
          <div className="team-row">
            {renderGroup('Community')}
            {renderGroup('Marketing')}
          </div>
          
          <div className="team-row">
            {renderGroup('Media')}
            {renderGroup('Technical')}
          </div>
          
          {renderGroup('Operation')}
        </div>
      </section>
    </main>
  );
}
