import type { GalleryItem } from '../../types/gallery';
import ctechquizImg from '../../assets/events/ctechquiz.webp';
import forumtechImg from '../../assets/events/forumtech.webp';
import gitstartedImg from '../../assets/events/gitstarted.webp';
import swiftfImg from '../../assets/events/swiftf.webp';

export const GALLERY_CMS_SPREADSHEET_ID = '19MZurj2vhcXgPNNTvuYfaNPbF1IBmxD1GVYRUg7P0xc';

export const FALLBACK_CMS_PHOTOS: string[] = [
  ctechquizImg,
  forumtechImg,
  gitstartedImg,
  swiftfImg,
];

export interface CmsItem extends GalleryItem {
  folderId: string;
  isVideo: boolean;
}

let cachedItems: CmsItem[] | null = null;
let fetchPromise: Promise<CmsItem[]> | null = null;

/**
 * Fetch and parse all items from the Google Spreadsheet CMS.
 * Caches results in memory to eliminate redundant network requests.
 */
export async function fetchCmsItems(): Promise<CmsItem[]> {
  if (cachedItems !== null) {
    return cachedItems;
  }

  if (fetchPromise !== null) {
    return fetchPromise;
  }

  fetchPromise = (async () => {
    try {
      const cacheBuster = Date.now();
      const url = `https://docs.google.com/spreadsheets/d/${GALLERY_CMS_SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=GalleryItems&_cb=${cacheBuster}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch Gallery CMS: ${response.status}`);
      }

      const text = await response.text();
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}') + 1;
      if (jsonStart === -1 || jsonEnd === 0) {
        throw new Error('Invalid JSON from CMS');
      }

      const data = JSON.parse(text.substring(jsonStart, jsonEnd));
      const rows = data?.table?.rows || [];

      const items: CmsItem[] = [];

      rows.forEach((row: { c?: Array<{ v?: string | number | null } | null> }, index: number) => {
        const cells = row.c;
        if (!cells) return;

        const folderId = String(cells[0]?.v || '').trim().toLowerCase();
        if (!folderId || folderId === 'folderid') return;

        const title = String(cells[1]?.v || '');
        let image = String(cells[2]?.v || '');
        const description = String(cells[3]?.v || '');
        const tagsRaw = String(cells[4]?.v || '');

        const isVideo = Boolean(image.match(/\.(mp4|webm|mov)/i) || image.includes('#video'));

        // Process Drive image URLs to convert to high-reliability lh3 CDN endpoint
        const driveRegex = /drive\.google\.com\/file\/d\/([^/]+)/;
        const match = image.match(driveRegex);
        if (match && match[1]) {
          if (isVideo) {
            const extMatch = image.match(/\.(mp4|webm|mov)/i);
            const ext = extMatch ? extMatch[1] : 'mp4';
            image = `https://drive.google.com/uc?export=view&id=${match[1]}#video.${ext}`;
          } else {
            image = `https://lh3.googleusercontent.com/d/${match[1]}`;
          }
        }

        const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()) : [];

        items.push({
          id: `${folderId}-item-${index}`,
          folderId,
          title,
          imageUrl: image,
          description,
          tags,
          isVideo,
        });
      });

      cachedItems = items;
      return items;
    } catch (err) {
      console.error('Error fetching CMS items:', err);
      fetchPromise = null;
      return [];
    }
  })();

  return fetchPromise;
}

/**
 * Fetch all photo items (excluding videos) from the CMS.
 * Returns local fallback images if the remote CMS request fails.
 */
export async function fetchCmsPhotos(): Promise<string[]> {
  const items = await fetchCmsItems();
  const photos = items.filter((item) => !item.isVideo).map((item) => item.imageUrl);
  return photos.length > 0 ? photos : FALLBACK_CMS_PHOTOS;
}
