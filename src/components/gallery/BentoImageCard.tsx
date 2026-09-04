import { useState } from 'react';
import type { GalleryItem } from '../../types/gallery';

interface BentoImageCardProps {
  item: GalleryItem;
  sizeClass: string;
}

export function BentoImageCard({ item, sizeClass }: BentoImageCardProps) {
  const [loaded, setLoaded] = useState(false);
  const isVideo = item.imageUrl.match(/\.(mp4|webm|mov)/i) || item.imageUrl.includes('#video');
  const isYouTube = item.imageUrl.includes('youtube.com/watch') || item.imageUrl.includes('youtu.be/');

  return (
    <div className={`bento-image-card ${sizeClass}`}>
      <div className={`image-shimmer ${loaded ? 'hidden' : ''}`} />
      
      {isVideo || isYouTube ? (
        <div className="bento-image-media-wrapper">
          <div className="video-play-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          {isYouTube ? (
            <img 
              src={`https://img.youtube.com/vi/${item.imageUrl.split('v=')[1]?.split('&')[0] || item.imageUrl.split('youtu.be/')[1]?.split('?')[0]}/maxresdefault.jpg`}
              alt={item.title}
              onLoad={() => setLoaded(true)}
              className={loaded ? 'loaded' : ''}
              loading="lazy"
            />
          ) : (
            <img 
              src={item.imageUrl.replace('#video.mp4', '').replace('#video.mov', '')}
              alt={item.title}
              onLoad={() => setLoaded(true)}
              className={loaded ? 'loaded' : ''}
              loading="lazy"
            />
          )}
        </div>
      ) : (
        <img
          src={item.imageUrl}
          alt={item.title}
          onLoad={() => setLoaded(true)}
          className={`bento-image-media ${loaded ? 'loaded' : ''}`}
          loading="lazy"
        />
      )}
      
      <div className="bento-image-overlay">
        <p>{item.description || item.title}</p>
      </div>
    </div>
  );
}
