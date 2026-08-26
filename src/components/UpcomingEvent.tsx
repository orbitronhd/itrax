import { ArrowUpRight } from 'lucide-react';
import type { EventItem } from '../types/events';
import { eventsData } from '../data/eventsData';
import './css/UpcomingEvent.css';

function isFutureEvent(event: EventItem): boolean {
  if (event.status === 'upcoming' || event.status === 'ongoing') return true;
  if (event.status === 'completed') return false;

  const parsed = new Date(event.date);
  if (!isNaN(parsed.getTime())) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return parsed >= today;
  }

  return false;
}

export function UpcomingEvent() {
  const nextEvent = eventsData.find(isFutureEvent) || eventsData[0];


  return (
    <section className="upcoming-event-section" aria-label="Upcoming Event">
      <div className="upcoming-event-container">
        {/* Left: Poster Polaroid */}
        <div className="event-poster-wrapper">
          <div className="polaroid-hanger">
            <div className="clip-assembly clip-left">
              <div className="clip-string" />
              <svg className="binder-clip" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                {/* Silver wire handle */}
                <path d="M 42 90 L 35 65 C 20 40 20 20 35 20 L 65 20 C 80 20 80 40 65 65 L 58 90" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 42 90 L 35 65 C 20 40 20 20 35 20 L 65 20 C 80 20 80 40 65 65 L 58 90" fill="none" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Black clip body */}
                <rect x="15" y="85" width="70" height="12" rx="6" fill="#1e293b" />
                <path d="M 10 92 L 90 92 L 85 140 C 85 145 80 150 75 150 L 25 150 C 20 150 15 145 15 140 Z" fill="#020617" />
                
                {/* Subtle highlight */}
                <path d="M 12 92 L 88 92 L 85 105 L 15 105 Z" fill="#0f172a" />
                
                {/* Bottom grip cylinder */}
                <rect x="15" y="138" width="70" height="12" rx="6" fill="#1e293b" />
              </svg>
            </div>
            
            <div className="clip-assembly clip-right">
              <div className="clip-string" />
              <svg className="binder-clip" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                {/* Silver wire handle */}
                <path d="M 42 90 L 35 65 C 20 40 20 20 35 20 L 65 20 C 80 20 80 40 65 65 L 58 90" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 42 90 L 35 65 C 20 40 20 20 35 20 L 65 20 C 80 20 80 40 65 65 L 58 90" fill="none" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Black clip body */}
                <rect x="15" y="85" width="70" height="12" rx="6" fill="#1e293b" />
                <path d="M 10 92 L 90 92 L 85 140 C 85 145 80 150 75 150 L 25 150 C 20 150 15 145 15 140 Z" fill="#020617" />
                
                {/* Subtle highlight */}
                <path d="M 12 92 L 88 92 L 85 105 L 15 105 Z" fill="#0f172a" />
                
                {/* Bottom grip cylinder */}
                <rect x="15" y="138" width="70" height="12" rx="6" fill="#1e293b" />
              </svg>
            </div>
            
            <div className="event-polaroid">
            
            <div className="event-polaroid-photo" aria-hidden="true">
              {nextEvent?.imageUrl ? (
                <img 
                  src={nextEvent.imageUrl} 
                  alt={nextEvent.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <span className="poster-label">{nextEvent?.type || 'Event Poster'}</span>
              )}
            </div>
            
            <span className="event-polaroid-label">{nextEvent ? nextEvent.date : 'COMING SOON'}</span>
            </div>
          </div>
        </div>

        {/* Right: Event Details */}
        <div className="event-details">
          <h2 className="event-title">{nextEvent ? nextEvent.name : 'Coming Soon'}</h2>
          <p className="event-description">
            {nextEvent
              ? `Join us for ${nextEvent.name}, an exciting ${nextEvent.type.toLowerCase()} happening on ${nextEvent.date}. Connect, learn, and build with the iTrax community!`
              : "Stay tuned for upcoming events and workshops hosted by iTrax."}
          </p>
          {nextEvent?.registrationUrl ? (
            <a 
              href={nextEvent.registrationUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="upcoming-register-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
            >
              <span>Register Now</span>
              <ArrowUpRight size={18} />
            </a>
          ) : (
            <a href="/events" className="upcoming-register-btn" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              View All Events
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

