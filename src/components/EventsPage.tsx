import { useMemo } from 'react';
import { ImageIcon, Calendar, ArrowUpRight } from 'lucide-react';
import type { EventItem } from '../types/events';
import { useEvents } from '../hooks/useEvents';
import { HeroBanner } from './HeroBanner';
import './css/EventsPage.css';

interface ProcessedEvent {
  event: EventItem;
  timestamp: number;
}


/**
 * Helper to determine whether an event is in the future.
 */
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

export function EventsPage() {
  const { events, loading } = useEvents();

  const sortedEvents = useMemo(() => {
    const processed: ProcessedEvent[] = [];

    for (const event of events) {
      let timestamp = 0;

      const parsed = new Date(event.date);
      if (!isNaN(parsed.getTime())) {
        timestamp = parsed.getTime();
      } else {
        const yearMatch = event.date.match(/\b(20\d\d)\b/);
        if (yearMatch) {
          const year = parseInt(yearMatch[1], 10);
          timestamp = new Date(`${year}-01-01`).getTime();
        } else if (event.date.includes('TBD') || event.date.includes('TBA') || event.date.includes('TBH')) {
          // Push TBD/TBA events to the top (future)
          timestamp = Number.MAX_SAFE_INTEGER;
        }
      }

      processed.push({ event, timestamp });
    }

    // Sort descending by timestamp
    processed.sort((a, b) => b.timestamp - a.timestamp);
    
    return processed.map((item) => item.event);
  }, [events]);

  const totalEventsCount = sortedEvents.length;


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
        {loading ? (
          // Loading Skeleton
          <div className="events-list">
            {Array.from({ length: 3 }).map((_, i) => (
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
            ))}
          </div>
        ) : totalEventsCount > 0 ? (
          // Flat List of Events
          <div className="events-list">
            {sortedEvents.map((event) => {
              const isUpcoming = isFutureEvent(event);

              return (
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

                    <div className="event-box-meta">
                      <div className="event-box-date">
                        <Calendar size={18} strokeWidth={2} />
                        <span>{event.date}</span>
                      </div>

                      <div className="event-box-type">
                        <span>{event.type}</span>
                      </div>

                      {isUpcoming && event.registrationUrl && (
                        <div className="event-box-action">
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="event-register-btn"
                            aria-label={`Register for ${event.name}`}
                          >
                            <span>Register</span>
                            <ArrowUpRight size={16} strokeWidth={2.5} className="register-icon" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-events">
            <p>No events found. Stay tuned!</p>
          </div>
        )}
      </section>
    </main>
  );
}


