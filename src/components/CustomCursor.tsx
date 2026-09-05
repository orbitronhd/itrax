import { useEffect, useRef } from 'react';
import './css/CustomCursor.css';

export function CustomCursor() {
  const dotPosRef = useRef<HTMLDivElement>(null);
  const ringPosRef = useRef<HTMLDivElement>(null);
  const dotScaleRef = useRef<HTMLDivElement>(null);
  const ringScaleRef = useRef<HTMLDivElement>(null);

  // Use refs for mutable values that shouldn't trigger re-renders
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Optimization: Do not run cursor animation logic on touch devices
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const renderCursor = () => {
      if (dotPosRef.current) {
        dotPosRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringPosRef.current) {
        ringPosRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(renderCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    requestRef.current = requestAnimationFrame(renderCursor);

    // Interactive hover effect logic using event delegation
    const handleMouseOver = (e: MouseEvent) => {
      // Find if the cursor is over an interactive element or any of its children
      const target = (e.target as HTMLElement | null)?.closest(
        'a, button, .btn, .card, .hamburger, [role="button"], input, textarea, select, label, .polaroid-card, .flip-card, .event-box'
      );
      
      if (target) {
        if (ringScaleRef.current && dotScaleRef.current) {
          ringScaleRef.current.style.transform = 'scale(1)';
          ringScaleRef.current.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
          dotScaleRef.current.style.transform = 'scale(0.5)';
        }
      } else {
        if (ringScaleRef.current && dotScaleRef.current) {
          ringScaleRef.current.style.transform = 'scale(0.6)';
          ringScaleRef.current.style.backgroundColor = 'transparent';
          dotScaleRef.current.style.transform = 'scale(1)';
        }
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotPosRef} className="cursor-dot-pos">
        <div ref={dotScaleRef} className="cursor-dot" />
      </div>
      <div ref={ringPosRef} className="cursor-ring-pos">
        <div ref={ringScaleRef} className="cursor-ring" />
      </div>
    </>
  );
}
