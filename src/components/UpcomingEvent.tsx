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
          <div className="event-polaroid">
            {/* Yellow Paperclip */}
            <svg
              className="paperclip"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#eab308"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
            
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

