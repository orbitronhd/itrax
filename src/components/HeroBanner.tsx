import { useRef, useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import './css/HeroBanner.css';

export interface HeroBannerProps {
  imageUrl?: string;
  scrollY: number;
  vh: number;
}

function GlitchWord({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    timeout = setTimeout(() => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      let iteration = 0;
      
      interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (letter === ' ' || letter === '.') return letter;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        });

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 4; 
      }, 50);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{displayText || ' '}</span>;
}

export function HeroBanner({ imageUrl, scrollY, vh }: HeroBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVideo = imageUrl?.match(/\.(mp4|webm|ogg)$/i);

  // Calculate animation values based on scroll offset (relative to vh)
  // 0 - 0.1vh: Text 1 fades out
  const text1Progress = Math.max(0, Math.min(1, scrollY / (0.1 * vh)));
  const text1Opacity = 1 - text1Progress;
  const text1Blur = text1Progress * 12;
  const text1TranslateY = text1Progress * 20;

  // 0.05vh - 0.2vh: Text 2 fades in
  const text2Progress = Math.max(0, Math.min(1, (scrollY - 0.05 * vh) / (0.15 * vh)));
  const text2Opacity = text2Progress;
  const text2Blur = (1 - text2Progress) * 12;
  const text2TranslateY = (1 - text2Progress) * -20;

  // Background slow blur (0 - 1.5vh)
  const bgProgress = Math.max(0, Math.min(1, scrollY / (1.5 * vh)));
  const bgBlur = bgProgress * 12;
  const bgBrightness = 1 - (bgProgress * 0.4); 

  // Entire Hero fade out for crossfade into UpcomingEvent (1.5vh - 2.5vh)
  const heroFadeProgress = Math.max(0, Math.min(1, (scrollY - 1.5 * vh) / (1 * vh)));
  const heroOpacity = 1 - heroFadeProgress;

  return (
    <section 
      ref={containerRef} 
      className="hero-banner" 
      aria-label="Hero banner"
      style={{
        opacity: heroOpacity,
        pointerEvents: heroOpacity > 0.1 ? 'auto' : 'none'
      }}
    >
      <div 
        className="hero-background"
        style={{
          filter: `blur(${bgBlur}px) brightness(${bgBrightness})`
        }}
      >
        {isVideo ? (
          <video src={imageUrl} autoPlay loop muted playsInline className="hero-media" />
        ) : imageUrl ? (
          <img src={imageUrl} alt="Hero Background" className="hero-media" />
        ) : (
          <div className="hero-placeholder" />
        )}
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-text-container">
          <h1 
            className="hero-text hero-text-primary"
            style={{
              opacity: text1Opacity,
              filter: `blur(${text1Blur}px)`,
              transform: `translateY(${text1TranslateY}px)`,
              pointerEvents: text1Opacity > 0 ? 'auto' : 'none'
            }}
          >
            <GlitchWord text="INNOVATE." delay={0} />{' '}
            <GlitchWord text="BUILD." delay={800} />{' '}
            <GlitchWord text="LEAD." delay={1500} />
          </h1>
          <h1 
            className="hero-text hero-text-welcome"
            style={{
              opacity: text2Opacity,
              filter: `blur(${text2Blur}px)`,
              transform: `translateY(${text2TranslateY}px)`,
              pointerEvents: text2Opacity > 0 ? 'auto' : 'none'
            }}
          >
            Welcome to <span className="hero-blue">iTrax</span>
          </h1>
        </div>
        
        <div 
          className="hero-actions"
          style={{
            opacity: text2Opacity,
            transform: `translateY(${text2TranslateY}px)`,
            pointerEvents: text2Opacity > 0.5 ? 'auto' : 'none'
          }}
        >
          <button 
            onClick={() => {
              window.scrollTo({ top: window.innerHeight * 2.5, behavior: 'smooth' });
            }}
            className="hero-btn hero-btn--primary"
          >
            View Events <ArrowDown size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
