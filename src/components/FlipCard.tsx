import { useState } from 'react';
import type { ExecomMember } from '../data/execomData';
import './css/FlipCard.css';
import logoSmall from '../assets/itrax-logo-small.png';

interface FlipCardProps {
  member: ExecomMember;
}

export function FlipCard({ member }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Repeat watermark 8 times like the old site
  const watermarks = Array(8).fill(member.watermark);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking social links
  };

  return (
    <div
      className={`flip-card accent-${member.accent} ${isFlipped ? 'is-flipped' : ''}`}
      id={member.id}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View details for ${member.name}`}
    >
      <div className="flip-card-inner">
        {/* ---- FRONT FACE ---- */}
        <div className="flip-card-front">
          <div className="fcf-watermark">
            {watermarks.map((wm, i) => (
              <span key={i}>{wm}</span>
            ))}
          </div>
          
          <div className="fcf-photo">
            <img src={member.photo} alt={member.name} />
          </div>
          
          <div className="fcf-gradient"></div>
          
          <div className="fcf-nameplate">
            <div className="fcf-role-label">{member.role}</div>
            <div className="fcf-name">{member.name}</div>
          </div>
        </div>

        {/* ---- BACK FACE ---- */}
        <div className="flip-card-back">
          <div className="fcb-watermark">
            {watermarks.map((wm, i) => (
              <span key={i}>{wm}</span>
            ))}
          </div>
          
          <div>
            <div className="fcb-top">
              <img src={logoSmall} alt="iTrax" />
              <span className="fcb-badge">iTrax Execom 26–27</span>
            </div>
            <div className="fcb-name">{member.name}</div>
            <div className="fcb-role">{member.role}</div>
          </div>
          
          {member.socials.length > 0 && (
            <div className="fcb-socials">
              {member.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  className="social-btn"
                  title={social.platform === 'linkedin' ? 'LinkedIn' : 'GitHub'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSocialClick}
                >
                  {social.platform === 'linkedin' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
