export interface EventItem {
  id: string;
  name: string;
  date: string;
  type: string;
  imageUrl?: string;
  registrationUrl?: string;
  status?: 'upcoming' | 'ongoing' | 'completed';
  galleryFolderId?: string;
}

