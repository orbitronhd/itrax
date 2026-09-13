import type React from 'react';
import { Link } from 'react-router-dom';
import itraxLogo from '../assets/itrax-logo-small.png';
import './css/Footer.css';

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
        <img src={itraxLogo} alt="iTrax Logo" className="footer-logo" />
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; iTrax. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
