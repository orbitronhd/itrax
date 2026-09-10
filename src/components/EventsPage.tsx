import { useMemo, useState, useEffect } from 'react';
import { ArrowUpRight, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { EventItem } from '../types/events';
import { useEvents } from '../hooks/useEvents';
import { HeroBanner } from './HeroBanner';
import eventsHeaderImg from '../assets/header/events.webp';
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

// Custom hook for the split-flap character cycling effect
function useSplitFlap(text: string, isReady: boolean) {
  const [displayText, setDisplayText] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (!isReady || !text) return;
    
    setIsFlipping(true);
    let iteration = 0;
    const maxIterations = 15;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789- ';
    
    const interval = setInterval(() => {
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
    
    return () => clearInterval(interval);
  }, [text, isReady]);

  return { displayText: displayText || text, isFlipping };
}

// A component that renders a string with split-flap animation on mount
function SplitFlapText({ text, isReady }: { text: string; isReady: boolean }) {
  const { displayText, isFlipping } = useSplitFlap(text, isReady);
  
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


function BoardRow({ event, isReady }: { event: EventItem; isReady: boolean }) {
  const isUpcoming = isFutureEvent(event);
  
  // Determine Status/Remarks
  let statusClass = '';
  let statusText = '';
  
  const isTBD = event.date.includes('TBD') || event.date.includes('TBA') || event.date.includes('TBH');

  if (event.status === 'ongoing') {
    statusClass = 'status-live';
    statusText = 'LIVE';
  } else if (isTBD) {
    statusClass = 'status-tbd';
    statusText = 'TBD';
  } else if (isUpcoming && event.registrationUrl) {
    statusClass = 'status-register';
    statusText = 'REGISTER';
  } else if (isUpcoming) {
    statusClass = 'status-upcoming';
    statusText = 'UPCOMING';
  } else {
    statusClass = 'status-completed';
    statusText = 'COMPLETED';
  }

  return (
    <div className="board-row">
      <div className="board-cell">
        <SplitFlapText text={event.date} isReady={isReady} />
      </div>
      <div className="board-cell cell-event">
        <SplitFlapText text={event.name} isReady={isReady} />
      </div>
      <div className="board-cell">
        <SplitFlapText text={event.type} isReady={isReady} />
      </div>
      <div className="board-cell cell-status">
        {statusClass === 'status-register' && event.registrationUrl ? (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="status-register"
            aria-label={`Register for ${event.name}`}
          >
            <SplitFlapText text="REGISTER" isReady={isReady} />
            <ArrowUpRight size={16} strokeWidth={2.5} style={{ marginLeft: '4px' }} />
          </a>
        ) : (
          <span className={statusClass}>
            <SplitFlapText text={statusText} isReady={isReady} />
          </span>
        )}
        
        {event.galleryFolderId && (
          <Link 
            to={`/gallery#${event.id}`} 
            className="gallery-link" 
            title="View Gallery"
            aria-label={`View gallery for ${event.name}`}
          >
            <Camera size={18} />
          </Link>
        )}
      </div>
    </div>
  );
}


export function EventsPage() {
  const { events, loading } = useEvents();
  const [isReady, setIsReady] = useState(false);

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
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      <HeroBanner
        title={
          <>
            THE&nbsp;
            <span className="hero-heading-accent">EVENTS</span>
          </>
        }
        subtitle="Explore workshops, hackathons, and tech sessions hosted by iTrax."
        imageUrl={eventsHeaderImg}
      />

      <section className="departure-board-section" aria-label="Events Departure Board">
        <div className="departure-board">
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
              {sortedEvents.map((event) => (
                <BoardRow key={event.id} event={event} isReady={isReady} />
              ))}
            </div>
          ) : (
            <div className="no-events">
              <p>No events found. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
