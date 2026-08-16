import './AboutSection.css';

const polaroids = [
  {
    label: 'Gallery',
    href: '/gallery',
    rotate: '-3deg',
    id: 'polaroid-gallery',
  },
  {
    label: 'Meet the Team',
    href: '/execom',
    rotate: '1.5deg',
    id: 'polaroid-execom',
  },
  {
    label: 'Events',
    href: '/events',
    rotate: '-1deg',
    id: 'polaroid-events',
  },
];

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        {/* ── Row 1: Who We Are + Mission ── */}
        <div className="about-container">
          <div className="about-intro">
            <h2 className="about-title">
              WHO <span className="about-title-accent">WE</span> ARE
            </h2>
            <p className="about-description">
              iTrax is the official IT department club of RSET dedicated to bringing students closer to the ever-evolving world of technology. We organize hackathons, coding contests, tech talks, and workshops that help members sharpen their technical skills, collaborate on real-world projects, and build a strong network within the tech community.
            </p>
          </div>

          <div className="about-mission-box">
            <h3 className="about-box-title">Our Mission</h3>
            <p className="about-box-text">
              To empower students with practical technical skills through hands-on events, hackathons, and workshops that bridge the gap between classroom learning and real-world engineering.
            </p>
          </div>
        </div>

        {/* ── Row 2: Polaroid Grid ── */}
        <div className="polaroid-grid" role="list">
          {polaroids.map(({ label, href, rotate, id }) => (
            <a
              key={id}
              id={id}
              href={href}
              className="polaroid-card"
              style={{ '--rotate': rotate } as React.CSSProperties}
              role="listitem"
              aria-label={`Go to ${label}`}
            >
              <div className="polaroid-photo">
                {/* Placeholder image area */}
                <div className="polaroid-photo-placeholder" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                {/* Label ON the polaroid frame */}
                <span className="polaroid-label">{label}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
