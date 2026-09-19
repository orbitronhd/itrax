export interface EventItem {
  id: string;
  name: string;
  date: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  type: string;
  imageUrl?: string;
  registrationUrl?: string;
  description?: string;
  status?: 'upcoming' | 'ongoing' | 'completed';
}

