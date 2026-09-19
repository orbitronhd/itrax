import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useEvents } from '../hooks/useEvents';
import { computeEventStatus, isActiveEvent } from '../utils/eventStatus';
import './css/UpcomingEvent.css';



interface UpcomingEventProps {
  scrollY: number;
  vh: number;
}

export function UpcomingEvent({ scrollY, vh }: UpcomingEventProps) {
  const { events, loading } = useEvents();
  const nextEvent = events.find(isActiveEvent) || events[0];

  const isUpcomingOrOngoing = nextEvent ? isActiveEvent(nextEvent) : false;
  const computedStatus = nextEvent ? computeEventStatus(nextEvent) : 'upcoming';

  let displayDate = nextEvent?.date;
  if (nextEvent?.endDate && nextEvent.endDate !== nextEvent.date) {
    displayDate += ` – ${nextEvent.endDate}`;
  }
  let displayTime = '';
  if (nextEvent?.startTime) {
    displayTime = nextEvent.startTime;
    if (nextEvent.endTime) displayTime += ` – ${nextEvent.endTime}`;
  }

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
                <span className={`featured-event-status status-${computedStatus}`}>
                  {computedStatus.toUpperCase()}
                </span>
              )}
            </div>

            <h2 className="featured-event-title">
              {loading ? 'Loading Event...' : nextEvent ? nextEvent.name : 'Coming Soon'}
            </h2>

            <p className="featured-event-date">
              {!loading && nextEvent && (
                <>
                  {displayDate}
                  {displayTime && <span className="featured-event-time"> | {displayTime}</span>}
                </>
              )}
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
              {isUpcomingOrOngoing && nextEvent?.registrationUrl && !loading && (
                <a
                  href={nextEvent.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-register-btn"
                >
                  Register Now <ArrowUpRight size={18} strokeWidth={2.5} />
                </a>
              )}

              {nextEvent?.galleryUrl && !loading && (
                <a
                  href={nextEvent.galleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-register-btn"
                  style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                >
                  View Gallery <ArrowUpRight size={18} strokeWidth={2.5} />
                </a>
              )}

              {!loading && (!nextEvent?.registrationUrl || !isUpcomingOrOngoing) && !nextEvent?.galleryUrl && (
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

