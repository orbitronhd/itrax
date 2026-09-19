import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight } from 'lucide-react';
import type { EventItem } from '../types/events';
import { useEvents } from '../hooks/useEvents';
import { computeEventStatus, isActiveEvent } from '../utils/eventStatus';
import './css/EventsPage.css';

interface ProcessedEvent {
  event: EventItem;
  timestamp: number;
}



// Custom hook for the split-flap character cycling effect
function useSplitFlap(text: string, isReady: boolean, delay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (!isReady || !text) return;

    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      setIsFlipping(true);
      let iteration = 0;
      const maxIterations = 15;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789- ';

      interval = setInterval(() => {
        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsFlipping(false);
          return;
        }

        const randomText = text.split('').map((char) => {
          if (char === ' ' && Math.random() > 0.5) return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');

        setDisplayText(randomText);
        iteration++;
      }, 40); // 40ms between flips
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, isReady, delay]);

  return { displayText: displayText || text, isFlipping };
}

// A component that renders a string with split-flap animation on mount
function SplitFlapText({ text, isReady, delay = 0 }: { text: string; isReady: boolean; delay?: number }) {
  const { displayText, isFlipping } = useSplitFlap(text, isReady, delay);

  return (
    <>
      {displayText.split('').map((char, i) => (
        <span key={i} className={`split-flap-char ${isFlipping ? 'flipping' : ''}`}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
}


function BoardRow({ event, isReady, delay, onClick }: { event: EventItem; isReady: boolean; delay: number; onClick: () => void }) {
  const computedStatus = computeEventStatus(event);
  const isTBD = event.date.includes('TBD') || event.date.includes('TBA') || event.date.includes('TBH');

  // Determine Status/Remarks
  let statusClass = '';
  let statusText = '';

  if (computedStatus === 'ongoing') {
    statusClass = 'status-live';
    statusText = 'LIVE';
  } else if (isTBD) {
    statusClass = 'status-tbd';
    statusText = 'TBD';
  } else if (computedStatus === 'upcoming' && event.registrationUrl) {
    statusClass = 'status-register';
    statusText = 'REGISTER';
  } else if (computedStatus === 'upcoming') {
    statusClass = 'status-upcoming';
    statusText = 'UPCOMING';
  } else {
    statusClass = 'status-completed';
    statusText = 'COMPLETED';
  }

  return (
    <div className="board-row" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}>
      <div className="board-cell">
        <SplitFlapText text={event.date} isReady={isReady} delay={delay} />
      </div>
      <div className="board-cell cell-event">
        <SplitFlapText text={event.name} isReady={isReady} delay={delay} />
      </div>
      <div className="board-cell">
        <SplitFlapText text={event.type} isReady={isReady} delay={delay} />
      </div>
      <div className="board-cell cell-status">
        {statusClass === 'status-register' && event.registrationUrl ? (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="status-register"
            aria-label={`Register for ${event.name}`}
            onClick={(e) => e.stopPropagation()}
          >
            <SplitFlapText text="REGISTER" isReady={isReady} delay={delay} />
            <ArrowUpRight size={16} strokeWidth={2.5} style={{ marginLeft: '4px' }} />
          </a>
        ) : (
          <span className={statusClass}>
            <SplitFlapText text={statusText} isReady={isReady} delay={delay} />
          </span>
        )}
      </div>
    </div>
  );
}

function EventDetailOverlay({ event, onClose }: { event: EventItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const computedStatus = computeEventStatus(event);
  const isUpcomingOrOngoing = computedStatus === 'upcoming' || computedStatus === 'ongoing';

  let displayDate = event.date;
  if (event.endDate && event.endDate !== event.date) {
    displayDate += ` – ${event.endDate}`;
  }
  let displayTime = '';
  if (event.startTime) {
    displayTime = event.startTime;
    if (event.endTime) displayTime += ` – ${event.endTime}`;
  }

  return (
    <div className="event-overlay-backdrop" onClick={onClose}>
      <div className="event-overlay-container" onClick={(e) => e.stopPropagation()}>
        <button className="event-overlay-close" onClick={onClose} aria-label="Close details">
          &times;
        </button>
        <div className="event-overlay-poster">
          {event.imageUrl ? (
            <img src={event.imageUrl} alt={event.name} />
          ) : (
            <div className="event-poster-placeholder">No Image Available</div>
          )}
        </div>
        <div className="event-overlay-details">
          <div className="event-overlay-header">
            <span className="event-overlay-type">{event.type}</span>
            <span className={`event-overlay-status status-${computedStatus}`}>
              {computedStatus.toUpperCase()}
            </span>
          </div>
          <h2 className="event-overlay-title">{event.name}</h2>
          <p className="event-overlay-date">
            {displayDate}
            {displayTime && <span className="event-overlay-time"> | {displayTime}</span>}
          </p>
          <div className="event-overlay-desc">
            {event.description ? event.description : 'Join us for an exciting event filled with learning and fun!'}
          </div>

          <div className="event-overlay-actions">
            {isUpcomingOrOngoing && event.registrationUrl && (
              <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="event-overlay-register-btn">
                Register Now <ArrowUpRight size={18} strokeWidth={2.5} />
              </a>
            )}
            {event.galleryUrl && (
              <a href={event.galleryUrl} target="_blank" rel="noopener noreferrer" className="event-overlay-gallery-btn">
                View Gallery <ArrowUpRight size={18} strokeWidth={2.5} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export function EventsPage() {
  const { events, loading } = useEvents();
  const [isReady, setIsReady] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    if (!loading) {
      // Small delay before starting animations to ensure DOM is ready
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

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
    <main style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - var(--nav-height))', justifyContent: 'center' }}>
      <section className="departure-board-section" aria-label="Events Departure Board">
        <div className="departure-board">
          <h1 className="events-board-heading">
            <SplitFlapText text="EVENTS" isReady={isReady} />
          </h1>
          <div className="board-columns">
            <div className="board-col-header">DATE</div>
            <div className="board-col-header">EVENT</div>
            <div className="board-col-header">TYPE</div>
            <div className="board-col-header">STATUS</div>
          </div>

          {loading ? (
            <div className="board-rows skeleton-board">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton-row">
                  <div className="skeleton-cell" style={{ width: '80%' }}></div>
                  <div className="skeleton-cell" style={{ width: '100%' }}></div>
                  <div className="skeleton-cell" style={{ width: '60%' }}></div>
                  <div className="skeleton-cell" style={{ width: '70%' }}></div>
                </div>
              ))}
            </div>
          ) : totalEventsCount > 0 ? (
            <div className="board-rows">
              {sortedEvents.map((event: EventItem, i: number) => (
                <BoardRow key={event.id} event={event} isReady={isReady} delay={i * 120} onClick={() => setSelectedEvent(event)} />
              ))}
            </div>
          ) : (
            <div className="no-events">
              <p>No events found. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      {selectedEvent && createPortal(
        <EventDetailOverlay event={selectedEvent} onClose={() => setSelectedEvent(null)} />,
        document.body
      )}
    </main>
  );
}
