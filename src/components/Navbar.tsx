import { useState, useEffect } from 'react';
import './css/Navbar.css';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Execom', href: '#' },
  { label: 'Events', href: '#' },
  { label: 'Gallery', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Contacts', href: '#' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      {/* Placeholder Logo */}
      <a href="#" className="logo" onClick={closeMenu}>
        <span className="logo-placeholder">iTrax</span>
      </a>

      {/* Desktop Links */}
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
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
    </nav>
  );
}
