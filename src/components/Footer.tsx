import { useState, useEffect } from 'react';
import './css/Footer.css';

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`footer ${isVisible ? 'footer--visible' : ''}`}>
      <p>&copy; {new Date().getFullYear()} <a href="#">iTrax</a>. All rights reserved.</p>
    </footer>
  );
}
