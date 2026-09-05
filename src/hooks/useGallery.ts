import { useState, useEffect } from 'react';
import type { GalleryItem } from '../types/gallery';
import { useEvents } from './useEvents';
import { fetchCmsItems, GALLERY_CMS_SPREADSHEET_ID } from '../services/cms/galleryCms';

export { GALLERY_CMS_SPREADSHEET_ID };

export function useGallery() {
  const { events, loading: eventsLoading } = useEvents();
  const [itemsByFolder, setItemsByFolder] = useState<Record<string, GalleryItem[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        const items = await fetchCmsItems();
        const itemMap: Record<string, GalleryItem[]> = {};

        for (const item of items) {
          if (!itemMap[item.folderId]) {
            itemMap[item.folderId] = [];
          }

          itemMap[item.folderId].push({
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            description: item.description,
            tags: item.tags,
          });
        }

        setItemsByFolder(itemMap);
      } catch (err) {
        console.error('Error fetching gallery items from CMS:', err);
        setError('Failed to load gallery items from CMS.');
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryItems();
  }, []);

  // Compute active folders by cross-referencing events database
  const activeFolders = events
    .filter((event) => event.galleryFolderId)
    .map((event) => {
      const items = itemsByFolder[event.galleryFolderId!] || [];
      const firstImageItem = items.find(
        (item) => !item.imageUrl.match(/\.(mp4|webm|mov)/i) && !item.imageUrl.includes('#video')
      );
      const cmsCover = firstImageItem?.imageUrl || items[0]?.imageUrl || event.imageUrl;

      return {
        id: event.id, // we use the Event's ID as the main key
        title: event.name,
        category: event.type,
        dateText: event.date,
        coverImage: cmsCover,
        size: 'normal' as import('../types/gallery').BentoSize, // size can be random or computed
        description: `Highlights from ${event.name}`,
        items
      };
    })
    .filter((folder) => folder.items.length > 0);

  // Assign sizes to folders sequentially for a masonry-like bento layout
  const sizes: ('normal' | 'wide' | 'tall' | 'hero')[] = ['hero', 'wide', 'tall', 'normal', 'normal', 'wide', 'normal', 'tall', 'hero'];
  activeFolders.forEach((folder, idx) => {
    folder.size = sizes[idx % sizes.length];
  });

  return { folders: activeFolders, loading: loading || eventsLoading, error };
}
