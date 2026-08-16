import type { ReactNode } from 'react';
import './css/HeroBanner.css';

interface HeroBannerProps {
  title?: ReactNode;
  subtitle?: ReactNode;
}

export function HeroBanner({
  title = (
    <>
      INNOVATE. BUILD.&nbsp;
      <span className="hero-heading-accent">LEAD.</span>
    </>
  ),
  subtitle = 'Department Club of Information Technology, RSET',
}: HeroBannerProps) {
  return (
    <section className="hero-banner" aria-label="Hero banner">
      {/* ── Left: photo placeholder ── */}
      <div className="hero-image-side">
        <div className="hero-image-placeholder" aria-label="Hero photo placeholder">
          <div className="placeholder-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <span className="placeholder-label">Photo coming soon</span>
        </div>

        {/* Fade overlay — sits on top of the image, fades right into the solid BG */}
        <div className="hero-fade-overlay" aria-hidden="true" />
      </div>

      {/* ── Right: text content ── */}
      <div className="hero-text-side">
        <h1 className="hero-heading">
          {title}
        </h1>

        {subtitle && (
          <p className="hero-subheading">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
