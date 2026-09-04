import { useState, useEffect } from 'react';
import type { GalleryItem } from '../types/gallery';
import { useEvents } from './useEvents';

export const GALLERY_CMS_SPREADSHEET_ID = '19MZurj2vhcXgPNNTvuYfaNPbF1IBmxD1GVYRUg7P0xc';

export function useGallery() {
  const { events, loading: eventsLoading } = useEvents();
  const [itemsByFolder, setItemsByFolder] = useState<Record<string, GalleryItem[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGalleryItems() {
      if (!GALLERY_CMS_SPREADSHEET_ID) {
        setLoading(false);
        return;
      }

      try {
        const cacheBuster = new Date().getTime();
        const url = `https://docs.google.com/spreadsheets/d/${GALLERY_CMS_SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=GalleryItems&_cb=${cacheBuster}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch Gallery CMS');
        
        const text = await response.text();
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        if (jsonStart === -1 || jsonEnd === 0) throw new Error('Invalid JSON from CMS');
        
        const data = JSON.parse(text.substring(jsonStart, jsonEnd));
        const rows = data?.table?.rows || [];
        
        const itemMap: Record<string, GalleryItem[]> = {};

        // Skip header row if it exists (usually the first row where id === 'FolderID')
        rows.forEach((row: any, index: number) => {
          const cells = row.c;
          if (!cells) return;

          const folderId = String(cells[0]?.v || '').trim().toLowerCase();
          if (!folderId || folderId.toLowerCase() === 'folderid') return;

          const title = String(cells[1]?.v || '');
          let image = String(cells[2]?.v || '');
          const description = String(cells[3]?.v || '');
          const tagsRaw = String(cells[4]?.v || '');
          
          // Process image URL similarly to the old site to get Drive links working
          const driveRegex = /drive\.google\.com\/file\/d\/([^/]+)/;
          const match = image.match(driveRegex);
          if (match && match[1]) {
            const isVideo = image.match(/\.(mp4|webm|mov)/i) || image.includes('#video');
            if (isVideo) {
              const extMatch = image.match(/\.(mp4|webm|mov)/i);
              const ext = extMatch ? extMatch[1] : 'mp4';
              image = `https://drive.google.com/uc?export=view&id=${match[1]}#video.${ext}`;
            } else {
              image = `https://lh3.googleusercontent.com/d/${match[1]}`;
            }
          }

          const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()) : [];

          if (!itemMap[folderId]) {
            itemMap[folderId] = [];
          }

          itemMap[folderId].push({
            id: `${folderId}-item-${index}`,
            title,
            imageUrl: image,
            description,
            tags
          });
        });

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
      return {
        id: event.id, // we use the Event's ID as the main key
        title: event.name,
        category: event.type,
        dateText: event.date,
        coverImage: event.imageUrl,
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
