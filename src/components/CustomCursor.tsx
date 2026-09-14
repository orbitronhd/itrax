import { useEffect, useRef } from 'react';
import './css/CustomCursor.css';

export function CustomCursor() {
  const dotPosRef = useRef<HTMLDivElement>(null);
  const dotScaleRef = useRef<HTMLDivElement>(null);

  // Use refs for mutable values that shouldn't trigger re-renders
  const mouse = useRef({ x: 0, y: 0 });
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
        if (dotScaleRef.current) {
          dotScaleRef.current.style.transform = 'scale(6)';
          dotScaleRef.current.style.backgroundColor = 'rgba(56, 189, 248, 0.4)';
          dotScaleRef.current.style.opacity = '1';
        }
      } else {
        if (dotScaleRef.current) {
          dotScaleRef.current.style.transform = 'scale(1)';
          dotScaleRef.current.style.backgroundColor = 'var(--accent-bright)';
          dotScaleRef.current.style.opacity = '1';
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
    </>
  );
}
