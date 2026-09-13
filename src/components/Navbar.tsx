import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import itraxLogo from '../assets/itrax-logo-small.png';
import './css/Navbar.css';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Execom', href: '/execom' },
  { label: 'Events', href: '/events' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const THRESHOLD = 5;

    const handleScroll = () => {
      const currentY = window.scrollY;

      setIsScrolled(currentY > 60);

      if (Math.abs(currentY - lastScrollY.current) >= THRESHOLD) {
        if (currentY > lastScrollY.current && currentY > 80) {
          setIsHidden(true);
        } else if (currentY < lastScrollY.current) {
          setIsHidden(false);
        }
        lastScrollY.current = currentY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isHidden && !isOpen ? 'navbar--hidden' : ''}`}>
      {/* Brand Logo */}
      <Link to="/" className="logo" onClick={closeMenu}>
        <img src={itraxLogo} alt="iTrax Logo" className="logo-img" />
      </Link>

      <div className="nav-right">
        {/* Desktop Links */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.href}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <div
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          role="button"
          tabIndex={0}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
}
