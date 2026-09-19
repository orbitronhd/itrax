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
 *    - `endDate` (optional string): Event end date (e.g., 'OCT 25, 2026' or '2026-10-25')
 *    - `startTime` (optional string): Event start time (e.g., '09:00')
 *    - `endTime` (optional string): Event end time (e.g., '17:00')
 *    - `description` (optional string): Description of the event
 *    - `registrationUrl` (optional string): Link to Google Form/registration portal (active for upcoming events)
 *    - `imageUrl` (optional string): Poster/banner image URL or path
 *    - `galleryUrl` (optional string): External link to the event's gallery
 *    - `status` (optional 'upcoming' | 'ongoing' | 'completed'): Event status override
 */

export const eventsData: EventItem[] = [
  {
    id: 'adaptathon-2026',
    name: 'Adaptathon',
    date: 'SEP 14, 2026',
    type: 'Competition',
    description: 'Join the ultimate coding competition to adapt and overcome challenges.',
    imageUrl: new URL('../assets/events/adaptathon.webp', import.meta.url).href
  },
  {
    id: 'final-year-project-2026',
    name: 'More Than Just A Final Year Project',
    date: 'JUL 17, 2026',
    type: 'Workshop',
    description: 'A deep dive into building production-ready final year projects that stand out.',
    imageUrl: new URL('../assets/events/finalyearproject.webp', import.meta.url).href
  },
  {
    id: 'swiftf-2026',
    name: 'SWI{F}TF',
    date: 'MAR 13, 2026',
    type: 'Competition',
    description: 'An exciting swift programming competition pushing limits.',
    imageUrl: new URL('../assets/events/swiftf.webp', import.meta.url).href
  },
  {
    id: 'forumtech-2026',
    name: 'ForumTech',
    date: 'FEB 13, 2026',
    type: 'Debate',
    description: 'A tech-focused debate forum bringing bright minds together.',
    imageUrl: new URL('../assets/events/forumtech.webp', import.meta.url).href
  },
  {
    id: 'git-started-2026',
    name: 'Git Started',
    date: 'FEB 06, 2026',
    type: 'Workshop',
    description: 'Learn Git and version control from the ground up in this hands-on workshop.',
    imageUrl: new URL('../assets/events/gitstarted.webp', import.meta.url).href
  },
  {
    id: 'c-tech-quiz-2026',
    name: 'C Tech Quiz',
    date: 'JAN 30, 2026',
    type: 'Competition',
    description: 'Test your knowledge of the C programming language in this rapid-fire quiz.',
    imageUrl: new URL('../assets/events/ctechquiz.webp', import.meta.url).href
  }
];

export const fallbackEvents = eventsData;
