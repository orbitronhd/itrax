import { ImageIcon, Calendar, Tag } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import { HeroBanner } from './HeroBanner';
import './css/EventsPage.css';

export function EventsPage() {
  const { events, loading } = useEvents();

  return (
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      <HeroBanner 
        title={
          <>
            THE&nbsp;
            <span className="hero-heading-accent">EVENTS</span>
          </>
        } 
        subtitle="Explore workshops, hackathons, and tech sessions hosted by iTrax."
      />

      <section className="events-page-section" aria-label="Events List">
        <div className="events-list">
          {loading ? (
            // Loading Skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="event-box skeleton-box">
                <div className="event-image-container skeleton-image">
                  <div className="event-image-fade" />
                </div>
                <div className="event-details-bar">
                  <div className="skeleton-text skeleton-name" />
                  <div className="skeleton-text skeleton-date" />
                  <div className="skeleton-text skeleton-type" />
                </div>
              </div>
            ))
          ) : (
            // Actual Events
            events.map((event) => (
              <div key={event.id} className="event-box">
                <div className="event-image-container">
                  {event.imageUrl ? (
                    <img 
                      src={event.imageUrl} 
                      alt={`${event.name} poster`} 
                      className="event-image" 
                      loading="lazy"
                    />
                  ) : (
                    <div className="event-image-placeholder" aria-label="Event poster placeholder">
                      <ImageIcon size={64} strokeWidth={1} />
                    </div>
                  )}
                  {/* The gradient overlay fading into the bottom details section */}
                  <div className="event-image-fade" />
                </div>

                <div className="event-details-bar">
                  <div className="event-box-name">
                    <h3>{event.name}</h3>
                  </div>
                  
                  <div className="event-box-date">
                    <Calendar size={18} strokeWidth={2} />
                    <span>{event.date}</span>
                  </div>

                  <div className="event-box-type">
                    <Tag size={16} strokeWidth={2} />
                    <span>{event.type}</span>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {!loading && events.length === 0 && (
            <div className="no-events">
              <p>No upcoming events at the moment. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
