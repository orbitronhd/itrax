import './UpcomingEvent.css';

export function UpcomingEvent() {
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
              <span className="poster-label">Event Poster</span>
            </div>
            
            <span className="event-polaroid-label">COMING SOON</span>
          </div>
        </div>

        {/* Right: Event Details */}
        <div className="event-details">
          <h2 className="event-title">&lt;Event Name&gt;</h2>
          <p className="event-description">
            Event Description goes here. This is a placeholder for the upcoming event's details. Join us for an exciting experience filled with learning and innovation.
          </p>
          <button className="event-register-btn">Register</button>
        </div>
      </div>
    </section>
  );
}
