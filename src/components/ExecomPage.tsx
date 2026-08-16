import { execomData } from '../data/execomData';
import { FlipCard } from './FlipCard';
import './css/ExecomPage.css';

export function ExecomPage() {
  return (
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      <div className="page-header">
        <h1>Executive Committee</h1>
        <p>The driving force behind iTrax — meet the passionate leaders who make it all happen.</p>
      </div>

      <section className="execom-section" aria-label="Executive Committee Members">
        <div className="execom-container">
          {execomData.map((group) => {
            // Generate a safe CSS class name for specific group styling if needed
            const groupClass = `group-${group.name.toLowerCase().replace(/\s+/g, '-')}`;

            return (
              <div key={group.name} className={`team-group ${groupClass}`}>
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
          })}
        </div>
      </section>
    </main>
  );
}
