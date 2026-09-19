import type React from 'react';
import { Link } from 'react-router-dom';
import itraxLogo from '../assets/itrax-logo-small.png';
import './css/Footer.css';

function LinkedinIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer(): React.JSX.Element {
  return (
    <footer className="footer-container" id="footer" aria-label="Site Footer">
      <div className="footer-content">
        <div className="footer-col-middle">
          <nav className="footer-nav-links" aria-label="Footer Navigation">
            <Link to="/" className="footer-nav-link">
              Home
            </Link>
            <Link to="/#about" className="footer-nav-link">
              About
            </Link>
            <Link to="/execom" className="footer-nav-link">
              Execom
            </Link>
            <Link to="/events" className="footer-nav-link">
              Events
            </Link>
          </nav>
        </div>
        <div className="footer-right">
          <div className="footer-social-links">
            <a href="https://www.linkedin.com/company/itrax-rset/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <LinkedinIcon size={22} />
            </a>
            <a href="https://www.instagram.com/itrax.rset/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
              <InstagramIcon size={22} />
            </a>
          </div>
          <img src={itraxLogo} alt="iTrax Logo" className="footer-logo" />
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; iTrax. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
