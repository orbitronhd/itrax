import type { GalleryFolder } from '../../types/gallery';

interface GalleryFolderCardProps {
  folder: GalleryFolder;
  onClick: () => void;
}

export function GalleryFolderCard({ folder, onClick }: GalleryFolderCardProps) {
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
      className={`bento-card span-${folder.size}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <span className="bento-badge">{folder.category}</span>
      
      <div className="bento-media-container">
        {folder.coverImage ? (
          <img src={folder.coverImage} alt={folder.title} className="bento-media" loading="lazy" />
        ) : (
          <div className="bento-placeholder">No Image</div>
        )}
      </div>
      
      <div className="bento-overlay"></div>
      
      <div className="bento-content">
        <h3 className="bento-title">{folder.title}</h3>
        <div className="bento-meta">
          {folder.dateText} &bull; {metaText}
        </div>
      </div>
    </div>
  );
}
