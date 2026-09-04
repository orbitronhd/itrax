import { useEffect } from 'react';
import type { GalleryFolder } from '../../types/gallery';
import { BentoImageCard } from './BentoImageCard';

interface GalleryBentoViewerProps {
  folder: GalleryFolder;
  onClose: () => void;
}

export function GalleryBentoViewer({ folder, onClose }: GalleryBentoViewerProps) {
  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const sizes = ['span-normal', 'span-wide', 'span-tall', 'span-hero'];
  
  return (
    <div className="bento-viewer-backdrop" onClick={onClose}>
      <div className="bento-viewer-container" onClick={(e) => e.stopPropagation()}>
        <div className="bento-viewer-header">
          <div className="viewer-header-info">
            <h2>{folder.title}</h2>
            <span className="viewer-badge">{folder.category}</span>
          </div>
          <button className="viewer-close-btn" onClick={onClose} aria-label="Close viewer">
            &times;
          </button>
        </div>
        
        <div className="bento-viewer-body">
          {folder.items.length === 0 ? (
            <div className="viewer-empty">No media available for this event.</div>
          ) : (
            <div className="bento-viewer-grid">
              {folder.items.map((item, idx) => (
                <BentoImageCard 
                  key={item.id} 
                  item={item} 
                  sizeClass={sizes[idx % sizes.length]} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
