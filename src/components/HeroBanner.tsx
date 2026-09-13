import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import './css/HeroBanner.css';

export interface HeroBannerProps {
  imageUrl?: string;
  scrollY: number;
  vh: number;
}

export function HeroBanner({ imageUrl, scrollY, vh }: HeroBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVideo = imageUrl?.match(/\.(mp4|webm|ogg)$/i);

  const innovateText = "INNOVATE. BUILD. LEAD.";
  
  // Calculate animation values based on scroll offset (relative to vh)
  // 0 - 0.5vh: Text 1 fades out
  const text1Progress = Math.max(0, Math.min(1, scrollY / (0.5 * vh)));
  const text1Opacity = 1 - text1Progress;
  const text1Blur = text1Progress * 12;
  const text1TranslateY = text1Progress * 20;

  // 0.4vh - 1.0vh: Text 2 fades in
  const text2Progress = Math.max(0, Math.min(1, (scrollY - 0.4 * vh) / (0.6 * vh)));
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
  const heroBlur = heroFadeProgress * 20;

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
            {innovateText}
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
              document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
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
