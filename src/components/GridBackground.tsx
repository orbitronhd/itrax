import { useEffect, useRef } from 'react';
import './GridBackground.css';

export function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        gridRef.current.style.transform = `translateY(${window.scrollY * 0.05}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div ref={gridRef} className="grid-bg" />;
}
