import { useEffect, useRef } from 'react';
import './CustomCursor.css';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Use refs for mutable values that shouldn't trigger re-renders
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top = `${mouse.current.y}px`;
      }
    };

    const renderCursor = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }

      requestRef.current = requestAnimationFrame(renderCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(renderCursor);

    // Interactive hover effect logic
    const handleMouseEnter = () => {
      if (ringRef.current && dotRef.current) {
        ringRef.current.style.width = '60px';
        ringRef.current.style.height = '60px';
        ringRef.current.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
        dotRef.current.style.transform = 'translate(-50%, -50%) scale(0.5)';
      }
    };

    const handleMouseLeave = () => {
      if (ringRef.current && dotRef.current) {
        ringRef.current.style.width = '36px';
        ringRef.current.style.height = '36px';
        ringRef.current.style.backgroundColor = 'transparent';
        dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    const attachListeners = () => {
      const interactives = document.querySelectorAll('a, button, .btn, .card');
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    attachListeners();

    const observer = new MutationObserver((mutations) => {
      let shouldAttach = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          shouldAttach = true;
          break;
        }
      }
      if (shouldAttach) {
        attachListeners();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
      observer.disconnect();
      const interactives = document.querySelectorAll('a, button, .btn, .card');
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
