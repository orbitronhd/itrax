import './UpcomingEvent.css';

export function UpcomingEvent() {
  return (
    <section className="upcoming-event-section" aria-label="Upcoming Event">
      <div className="upcoming-event-container">
        {/* Left: Poster Placeholder */}
        <div className="event-poster-wrapper">
          <div className="event-poster-placeholder" aria-label="Event Poster Placeholder">
            <span className="poster-label">Event Poster</span>
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
