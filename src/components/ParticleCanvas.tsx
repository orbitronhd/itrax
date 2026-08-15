import { useEffect, useRef } from 'react';
import './css/ParticleCanvas.css';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize(); // Initial sizing

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push(new Particle(width, height));
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animateCanvas = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const checkMouse = mx !== null && my !== null;

      // 1. Update and batch draw all particles
      ctx.beginPath();
      particlesRef.current.forEach((p) => {
        p.update(width, height);
        ctx.moveTo(p.x + p.radius, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      });
      ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.fill();

      // 2. Draw lines individually only if within squared distance
      if (checkMouse) {
        particlesRef.current.forEach((p) => {
          const dx = mx - p.x;
          const dy = my - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 22500) { // 150 * 150
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(37, 99, 235, ${1 - dist / 150})`;
            ctx.stroke();
          }
        });
      }

      // 3. Draw Grid Parallax Overlay (replaces CSS mask-image)
      const scrollY = window.scrollY;
      const offsetY = (scrollY * 0.05) % 60;
      
      const cx = width / 2;
      const cy = height * 0.4;
      const maxRadius = Math.max(width, height) * 0.7;
      
      const gridGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
      gridGrad.addColorStop(0, 'rgba(37, 99, 235, 0.024)');
      gridGrad.addColorStop(0.2, 'rgba(37, 99, 235, 0.024)');
      gridGrad.addColorStop(0.7, 'transparent');
      
      ctx.beginPath();
      for (let x = 0; x < width; x += 60) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY - 60; y < height; y += 60) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.strokeStyle = gridGrad;
      ctx.lineWidth = 1;
      ctx.stroke();

      requestRef.current = requestAnimationFrame(animateCanvas);
    };

    animateCanvas();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="bgCanvas" className="particle-canvas" />;
}
