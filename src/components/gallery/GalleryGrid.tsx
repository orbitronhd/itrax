import type { GalleryFolder } from '../../types/gallery';
import { GalleryFolderCard } from './GalleryFolderCard';

interface GalleryGridProps {
  folders: GalleryFolder[];
  onFolderClick: (folderId: string) => void;
}

export function GalleryGrid({ folders, onFolderClick }: GalleryGridProps) {
  if (folders.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
        No folders found for this category.
      </div>
    );
  }

  return (
    <div className="gallery-bento-grid">
      {folders.map((folder) => (
        <GalleryFolderCard
          key={folder.id}
          folder={folder}
          onClick={() => onFolderClick(folder.id)}
        />
      ))}
    </div>
  );
}
