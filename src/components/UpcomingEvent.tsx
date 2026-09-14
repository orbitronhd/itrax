import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { EventItem } from '../types/events';
import { useEvents } from '../hooks/useEvents';
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

interface UpcomingEventProps {
  scrollY: number;
  vh: number;
}

export function UpcomingEvent({ scrollY, vh }: UpcomingEventProps) {
  const { events, loading } = useEvents();
  const nextEvent = events.find(isFutureEvent) || events[0];

  const isUpcoming = nextEvent ? isFutureEvent(nextEvent) : false;

  // Fade IN from 0.4vh to 1.2vh (crossfading from HeroBanner)
  const fadeInProgress = Math.max(0, Math.min(1, (scrollY - 0.4 * vh) / (0.8 * vh)));

  // Fade OUT from 1.6vh to 2.2vh
  const fadeOutProgress = Math.max(0, Math.min(1, (scrollY - 1.6 * vh) / (0.6 * vh)));

  const opacity = fadeInProgress - fadeOutProgress;
  const translateY = (1 - fadeInProgress) * 40 - (fadeOutProgress * 40);

  return (
    <section
      className="featured-event-section"
      aria-label="Featured Event"
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none'
      }}
    >
      {nextEvent?.imageUrl && (
        <div className="featured-event-bg">
          <img src={nextEvent.imageUrl} alt="" aria-hidden="true" />
        </div>
      )}
      <div className="featured-event-overlay" />

      <div className="featured-event-content">
        <div className="featured-event-grid">
          {/* Left: Poster */}
          <div className="featured-event-poster">
            {loading ? (
              <div className="event-poster-skeleton" />
            ) : nextEvent?.imageUrl ? (
              <img src={nextEvent.imageUrl} alt={nextEvent.name} />
            ) : (
              <div className="event-poster-placeholder">No Image Available</div>
            )}
          </div>

          {/* Right: Details */}
          <div className="featured-event-details">
            <div className="featured-event-header">
              <span className="featured-event-type">{loading ? '...' : nextEvent?.type || 'EVENT'}</span>
              {!loading && nextEvent && (
                <span className={`featured-event-status ${isUpcoming ? 'status-upcoming' : 'status-completed'}`}>
                  {nextEvent.status?.toUpperCase() || (isUpcoming ? 'UPCOMING' : 'COMPLETED')}
                </span>
              )}
            </div>

            <h2 className="featured-event-title">
              {loading ? 'Loading Event...' : nextEvent ? nextEvent.name : 'Coming Soon'}
            </h2>

            <p className="featured-event-date">
              {!loading && nextEvent?.date}
            </p>

            <div className="featured-event-desc">
              {loading
                ? "Fetching the latest event details..."
                : nextEvent?.description
                  ? nextEvent.description
                  : nextEvent
                    ? `Join us for ${nextEvent.name}, an exciting ${nextEvent.type.toLowerCase()} happening on ${nextEvent.date}. Connect, learn, and build with the iTrax community!`
                    : "Stay tuned for upcoming events and workshops hosted by iTrax."}
            </div>

            <div className="featured-event-actions">
              {isUpcoming && nextEvent?.registrationUrl && !loading && (
                <a
                  href={nextEvent.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-register-btn"
                >
                  Register Now <ArrowUpRight size={18} strokeWidth={2.5} />
                </a>
              )}


              {!loading && (!nextEvent?.registrationUrl || !isUpcoming) && (
                <Link to="/events" className="featured-gallery-btn">
                  View All Events
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

