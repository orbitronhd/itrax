import { HeroBanner } from './HeroBanner';
import { galleryData } from '../data/galleryData';
import { ImageIcon } from 'lucide-react';
import './css/GalleryPage.css';

export function GalleryPage() {
  return (
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      <HeroBanner 
        title={
          <>
            THE&nbsp;
            <span className="hero-heading-accent">GALLERY</span>
          </>
        } 
        subtitle="A look back at our previous events, workshops, and competitions."
      />

      <section className="gallery-section" aria-label="Event Highlights">
        <div className="gallery-year-marker">
          <h2>2026</h2>
          <span className="accent-line"></span>
        </div>
        
        <div className="gallery-bento-grid">
          {galleryData.map((event) => (
            <div 
              key={event.id} 
              className={`bento-card span-${event.size}`}
            >
              {/* Image Placeholder */}
              <div className="bento-placeholder">
                <ImageIcon size={48} strokeWidth={1} />
              </div>
              
              <div className="bento-overlay"></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
