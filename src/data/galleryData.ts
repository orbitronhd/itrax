export type BentoSize = 'normal' | 'wide' | 'tall' | 'hero';

export interface GalleryEvent {
  id: string;
  title: string;
  date: string;
  category: string;
  size: BentoSize;
  description: string;
}

export const galleryData: GalleryEvent[] = [
  {
    id: 'g1',
    title: 'Hackathon 2026',
    date: 'Aug 2026',
    category: 'Competition',
    size: 'hero',
    description: 'Our annual 48-hour coding marathon.',
  },
  {
    id: 'g2',
    title: 'AI Workshop',
    date: 'Jul 2026',
    category: 'Workshop',
    size: 'wide',
    description: 'Hands-on session with the latest ML models.',
  },
  {
    id: 'g3',
    title: 'Alumni Meet',
    date: 'Jun 2026',
    category: 'Social',
    size: 'tall',
    description: 'Connecting past and present.',
  },
  {
    id: 'g4',
    title: 'Web Dev Bootcamp',
    date: 'May 2026',
    category: 'Workshop',
    size: 'normal',
    description: 'Mastering modern web frameworks.',
  },
  {
    id: 'g5',
    title: 'Tech Talk: Web3',
    date: 'Apr 2026',
    category: 'Seminar',
    size: 'normal',
    description: 'Exploring decentralized applications.',
  },
  {
    id: 'g6',
    title: 'Project Expo',
    date: 'Mar 2026',
    category: 'Exhibition',
    size: 'wide',
    description: 'Showcasing final year projects.',
  },
  {
    id: 'g7',
    title: 'Code Review Session',
    date: 'Feb 2026',
    category: 'Workshop',
    size: 'normal',
    description: 'Best practices for clean code.',
  },
  {
    id: 'g8',
    title: 'Freshers Welcome',
    date: 'Jan 2026',
    category: 'Social',
    size: 'tall',
    description: 'Welcoming the new batch of IT students.',
  },
  {
    id: 'g9',
    title: 'Cybersecurity Seminar',
    date: 'Dec 2025',
    category: 'Seminar',
    size: 'hero',
    description: 'Understanding modern threats and defenses.',
  },
];
