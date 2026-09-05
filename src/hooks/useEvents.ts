import { useState, useEffect } from 'react';
import type { EventItem } from '../types/events';
import { fetchCmsEvents } from '../services/cms/eventsCms';
import { eventsData } from '../data/eventsData';

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>(eventsData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiveSheet, setIsLiveSheet] = useState<boolean>(false);

  useEffect(() => {
    async function loadEvents() {
      try {
        const parsedEvents = await fetchCmsEvents();

        if (parsedEvents.length > 0) {
          // If CMS has events, merge them or use them directly.
          // For images, if the CMS field is blank, we can attempt to fallback
          // to the local image if the event IDs match.
          const mergedEvents = parsedEvents.map(cmsEvent => {
            if (!cmsEvent.imageUrl) {
              const localMatch = eventsData.find(e => e.id === cmsEvent.id);
              if (localMatch && localMatch.imageUrl) {
                return { ...cmsEvent, imageUrl: localMatch.imageUrl };
              }
            }
            return cmsEvent;
          });

          setEvents(mergedEvents);
          setIsLiveSheet(true);
        } else {
          setEvents(eventsData);
          setIsLiveSheet(false);
        }
      } catch (err) {
        console.error('Error fetching events from Google Sheet:', err);
        setError('Failed to load live events. Showing local data.');
        setEvents(eventsData);
        setIsLiveSheet(false);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  return { events, loading, error, isLiveSheet };
}
