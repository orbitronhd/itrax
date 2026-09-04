export type BentoSize = 'normal' | 'wide' | 'tall' | 'hero';

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  tags?: string[];
}

export interface GalleryFolder {
  id: string;
  title: string;
  category: string;
  dateText: string;
  coverImage?: string;
  size: BentoSize;
  description: string;
  items: GalleryItem[];
}
