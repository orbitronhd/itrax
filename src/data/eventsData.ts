import type { EventItem } from '../types/events';

/**
 * ============================================================================
 * ITRAX EVENTS DATA
 * ============================================================================
 * 
 * Instructions to edit or add events:
 * 1. Add or modify objects in the `eventsData` array below.
 * 2. Properties:
 *    - `id` (string): Unique identifier (e.g., 'hack-sprint-2026')
 *    - `name` (string): Title of the event
 *    - `date` (string): Event date (e.g., 'OCT 24, 2026' or '2026-10-24')
 *    - `type` (string): Category (e.g., 'Hackathon', 'Workshop', 'Keynote', 'Session')
 *    - `registrationUrl` (optional string): Link to Google Form/registration portal (active for upcoming events)
 *    - `imageUrl` (optional string): Poster/banner image URL or path
 *    - `status` (optional 'upcoming' | 'ongoing' | 'completed'): Event status override
 */

export const eventsData: EventItem[] = [
  {
    id: 'adaptathon-2026',
    name: 'Adaptathon',
    date: 'SEP 14, 2026',
    type: 'Competition',
    status: 'upcoming',
    imageUrl: '/src/assets/events/adaptathon.webp'
  },
  {
    id: 'final-year-project-2026',
    name: 'More Than Just A Final Year Project',
    date: 'JUL 17, 2026',
    type: 'Workshop',
    status: 'completed',
    imageUrl: '/src/assets/events/finalyearproject.webp'
  },
  {
    id: 'swiftf-2026',
    name: 'SWI{F}TF',
    date: 'MAR 13, 2026',
    type: 'Competition',
    status: 'completed',
    galleryFolderId: 'switf',
    imageUrl: '/src/assets/events/swiftf.webp'
  },
  {
    id: 'forumtech-2026',
    name: 'ForumTech',
    date: 'FEB 13, 2026',
    type: 'Debate',
    status: 'completed',
    galleryFolderId: 'forumtech',
    imageUrl: '/src/assets/events/forumtech.webp'
  },
  {
    id: 'git-started-2026',
    name: 'Git Started',
    date: 'FEB 06, 2026',
    type: 'Workshop',
    status: 'completed',
    galleryFolderId: 'gitstarted',
    imageUrl: '/src/assets/events/gitstarted.webp'

  },
  {
    id: 'c-tech-quiz-2026',
    name: 'C Tech Quiz',
    date: 'JAN 30, 2026',
    type: 'Competition',
    status: 'completed',
    galleryFolderId: 'ctechquiz',
    imageUrl: '/src/assets/events/ctechquiz.webp'
  }
];

export const fallbackEvents = eventsData;

export function isFutureEvent(event: EventItem): boolean {
  if (event.status === 'upcoming' || event.status === 'ongoing') return true;
  if (event.status === 'completed') return false;

  const parsed = new Date(event.date);
  if (!isNaN(parsed.getTime())) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return parsed >= today;
  }

  return false;
}
