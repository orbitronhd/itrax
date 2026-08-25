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
  // --- 2026 Events ---
  {
    id: 'future-web-talk-2026',
    name: 'Tech Talk: The Future of Web',
    date: 'DEC 05, 2026',
    type: 'Keynote',
    registrationUrl: 'https://forms.gle/itrax-web-talk',
    status: 'upcoming',
  },
  {
    id: 'ai-ml-bootcamp-2026',
    name: 'AI/ML Fundamentals Bootcamp',
    date: 'NOV 12, 2026',
    type: 'Workshop',
    registrationUrl: 'https://forms.gle/itrax-aiml-bootcamp',
    status: 'upcoming',
  },
  {
    id: 'hack-sprint-2026',
    name: 'HackSprint 2026',
    date: 'OCT 24, 2026',
    type: 'Hackathon',
    registrationUrl: 'https://forms.gle/itrax-hacksprint-2026',
    status: 'upcoming',
  },
  {
    id: 'cybersecurity-101-2026',
    name: 'Cybersecurity 101',
    date: 'SEP 15, 2026',
    type: 'Session',
    registrationUrl: 'https://forms.gle/itrax-cybersec-101',
    status: 'upcoming',
  },
  {
    id: 'cloud-devops-summit-2026',
    name: 'Cloud & DevOps Summit',
    date: 'JUL 18, 2026',
    type: 'Workshop',
    status: 'completed',
  },
  {
    id: 'intro-to-open-source-2026',
    name: 'Intro to Open Source & Git',
    date: 'MAY 10, 2026',
    type: 'Hands-on',
    status: 'completed',
  },

  // --- 2025 Events ---
  {
    id: 'web-dev-bootcamp-2025',
    name: 'Full Stack Web Bootcamp',
    date: 'OCT 18, 2025',
    type: 'Bootcamp',
    status: 'completed',
  },
  {
    id: 'ethical-hacking-2025',
    name: 'Cybersecurity & Ethical Hacking',
    date: 'AUG 22, 2025',
    type: 'Workshop',
    status: 'completed',
  },
  {
    id: 'code-genesis-2025',
    name: 'Code Genesis Hackathon',
    date: 'FEB 14, 2025',
    type: 'Hackathon',
    status: 'completed',
  }
];

export const fallbackEvents = eventsData;

/**
 * Extracts a numeric timestamp from an event date string for sorting.
 */
export function getEventTimestamp(dateStr: string): number {
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed.getTime();
  }
  const yearMatch = dateStr.match(/\b(20\d\d)\b/);
  if (yearMatch) {
    return new Date(`${yearMatch[1]}-01-01`).getTime();
  }
  return 0;
}

/**
 * Extracts the 4-digit year from an event date string.
 */
export function getEventYear(dateStr: string): number {
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed.getFullYear();
  }
  const yearMatch = dateStr.match(/\b(20\d\d)\b/);
  if (yearMatch) {
    return parseInt(yearMatch[1], 10);
  }
  return new Date().getFullYear();
}

/**
 * Helper to determine whether an event is in the future.
 */
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
