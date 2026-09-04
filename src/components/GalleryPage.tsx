import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HeroBanner } from './HeroBanner';
import { useGallery } from '../hooks/useGallery';
import { CMS_GALLERY_IMAGE } from '../constants/cmsImages';
import type { GalleryFolder, GalleryItem } from '../types/gallery';
import './css/GalleryPage.css';

export function GalleryPage() {
  const { folders, loading, error } = useGallery();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(folders.map(f => f.category));
    return Array.from(cats);
  }, [folders]);

  const filteredFolders = useMemo(() => {
    if (activeFilter === 'All') return folders;
    return folders.filter(f => f.category === activeFilter);
  }, [folders, activeFilter]);

  const activeFolder = useMemo(() => {
    return folders.find(f => f.id === activeFolderId) || null;
  }, [folders, activeFolderId]);

  return (
    <main style={{ flex: 1, position: 'relative' }}>
      <HeroBanner 
        title={
          <>
            THE&nbsp;
            <span className="hero-heading-accent">GALLERY</span>
          </>
        } 
        subtitle="A look back at our previous events, workshops, and competitions."
        imageUrl={CMS_GALLERY_IMAGE}
      />

      <section className="gallery-section" aria-label="Event Highlights">
        <div className="gallery-year-marker">
          <h2>2026</h2>
          <span className="accent-line"></span>
        </div>
        
        {loading ? (
          <div className="gallery-loading">Loading memories...</div>
        ) : error ? (
          <div className="gallery-error">{error}</div>
        ) : (
          <>
            {/* Filter Bar */}
            <div className="gallery-filter-bar">
              <button
                className={`gallery-filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
                onClick={() => setActiveFilter('All')}
              >
                All Highlights
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`gallery-filter-btn ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}s
                </button>
              ))}
            </div>
            
            {/* Folder Grid */}
            {filteredFolders.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                No folders found for this category.
              </div>
            ) : (
              <div className="gallery-folder-grid">
                {filteredFolders.map((folder) => (
                  <GalleryFolderCard
                    key={folder.id}
                    folder={folder}
                    onClick={() => setActiveFolderId(folder.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Viewer Modal via Portal */}
      {activeFolder && createPortal(
        <GalleryBentoViewer 
          folder={activeFolder} 
          onClose={() => setActiveFolderId(null)} 
        />,
        document.body
      )}
    </main>
  );
}

// ----------------------------------------------------------------------------
// Internal Components
// ----------------------------------------------------------------------------

function GalleryFolderCard({ folder, onClick }: { folder: GalleryFolder, onClick: () => void }) {
  // Count media types
  const videos = folder.items.filter(item => item.imageUrl.match(/\.(mp4|webm|mov)/i) || item.imageUrl.includes('#video')).length;
  const photos = folder.items.length - videos;

  let metaText = '';
  if (photos > 0 && videos > 0) {
    metaText = `${photos} ${photos === 1 ? 'Photo' : 'Photos'} & ${videos} ${videos === 1 ? 'Video' : 'Videos'}`;
  } else if (videos > 0) {
    metaText = `${videos} ${videos === 1 ? 'Video' : 'Videos'}`;
  } else {
    metaText = `${photos} ${photos === 1 ? 'Photo' : 'Photos'}`;
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="folder-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <span className="folder-badge">{folder.category}</span>
      
      <div className="folder-media-container">
        {folder.coverImage ? (
          <img src={folder.coverImage} alt={folder.title} className="folder-media" loading="lazy" />
        ) : (
          <div className="folder-placeholder">No Image</div>
        )}
      </div>
      
      <div className="folder-overlay"></div>
      
      <div className="folder-content">
        <h3 className="folder-title">{folder.title}</h3>
        <div className="folder-meta">
          {folder.dateText} &bull; {metaText}
        </div>
      </div>
    </div>
  );
}

function GalleryBentoViewer({ folder, onClose }: { folder: GalleryFolder, onClose: () => void }) {
  useEffect(() => {
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

function BentoImageCard({ item, sizeClass }: { item: GalleryItem, sizeClass: string }) {
  const [loaded, setLoaded] = useState(false);
  
  // Safely parse YouTube IDs
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
              src={`https://img.youtube.com/vi/${item.imageUrl.split('v=')[1]?.split('&')[0] || item.imageUrl.split('youtu.be/')[1]?.split('?')[0]}/hqdefault.jpg`}
              alt={item.title}
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
              className={loaded ? 'loaded' : ''}
              loading="lazy"
            />
          ) : (
            <img 
              src={item.imageUrl.replace('#video.mp4', '').replace('#video.mov', '')}
              alt={item.title}
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
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
          onError={() => setLoaded(true)}
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
