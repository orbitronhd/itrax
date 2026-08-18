import { useState, useEffect } from 'react';
import type { EventItem } from '../types/events';
import { GOOGLE_SHEET_CSV_URL } from '../data/eventsConfig';
import { fallbackEvents } from '../data/eventsData';

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>(fallbackEvents);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiveSheet, setIsLiveSheet] = useState<boolean>(false);

  useEffect(() => {
    async function fetchEvents() {
      if (!GOOGLE_SHEET_CSV_URL) {
        setEvents(fallbackEvents);
        setLoading(false);
        setIsLiveSheet(false);
        return;
      }

      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch Google Sheet data');
        }

        const csvText = await response.text();
        const parsedEvents = parseCSV(csvText);

        if (parsedEvents.length > 0) {
          setEvents(parsedEvents);
          setIsLiveSheet(true);
        } else {
          setEvents(fallbackEvents);
          setIsLiveSheet(false);
        }
      } catch (err) {
        console.error('Error fetching events from Google Sheet:', err);
        setError('Failed to load live events. Showing local data.');
        setEvents(fallbackEvents);
        setIsLiveSheet(false);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return { events, loading, error, isLiveSheet };
}

/**
 * Basic CSV parser for Google Sheets export.
 * Expects columns roughly mapped to: id, name, date, type, imageUrl, registrationUrl, status
 */
function parseCSV(csvText: string): EventItem[] {
  const lines = csvText.split('\n').filter((line) => line.trim() !== '');
  if (lines.length < 2) return []; // Only header or empty

  const headers = lines[0].split(',').map((h) => h.replace(/"/g, '').trim().toLowerCase());

  const parsedEvents: EventItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    // Basic CSV splitting handling quotes
    const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    if (!row) continue;

    const values = row.map((v) => v.replace(/^"|"$/g, '').trim());

    // Construct event item from row based on header index
    const event: Partial<EventItem> = {
      id: i.toString()
    };

    headers.forEach((header, index) => {
      const val = values[index] || '';
      if (header.includes('name') || header.includes('title')) event.name = val;
      if (header.includes('date') || header.includes('time')) event.date = val;
      if (header.includes('type') || header.includes('category')) event.type = val;
      if (header.includes('image') || header.includes('photo')) event.imageUrl = val;
      if (header.includes('url') || header.includes('link') || header.includes('register')) event.registrationUrl = val;
      if (header.includes('status')) event.status = val as 'upcoming' | 'ongoing' | 'completed';
    });

    // Only add if it has the bare minimum required fields
    if (event.name && event.date && event.type) {
      parsedEvents.push(event as EventItem);
    }
  }

  return parsedEvents;
}
