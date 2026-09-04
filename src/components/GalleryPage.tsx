import { useState, useMemo } from 'react';
import { HeroBanner } from './HeroBanner';
import { GalleryFilterBar } from './gallery/GalleryFilterBar';
import { GalleryGrid } from './gallery/GalleryGrid';
import { GalleryBentoViewer } from './gallery/GalleryBentoViewer';
import { useGallery } from '../hooks/useGallery';
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
        
        {loading ? (
          <div className="gallery-loading">Loading memories...</div>
        ) : error ? (
          <div className="gallery-error">{error}</div>
        ) : (
          <>
            <GalleryFilterBar 
              categories={categories} 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter} 
            />
            
            <GalleryGrid 
              folders={filteredFolders} 
              onFolderClick={setActiveFolderId} 
            />
          </>
        )}
      </section>

      {activeFolder && (
        <GalleryBentoViewer 
          folder={activeFolder} 
          onClose={() => setActiveFolderId(null)} 
        />
      )}
    </main>
  );
}
