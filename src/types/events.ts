export interface EventItem {
  id: string | number;
  name: string;
  date: string;
  type: string;
  imageUrl?: string;
  registrationUrl?: string;
  status?: 'upcoming' | 'ongoing' | 'completed';
}
