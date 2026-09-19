import type { EventItem } from '../../types/events';

export const EVENTS_CMS_SPREADSHEET_ID = '1Z6IFTvq7ai2hyqC1pVM7K_tjn8xQ4VdMujrtUkQRSUs';

let cachedEvents: EventItem[] | null = null;
let fetchPromise: Promise<EventItem[]> | null = null;

/**
 * Fetch and parse all items from the Google Spreadsheet Events CMS.
 * Caches results in memory to eliminate redundant network requests.
 */
export async function fetchCmsEvents(): Promise<EventItem[]> {
  if (cachedEvents !== null) {
    return cachedEvents;
  }

  if (fetchPromise !== null) {
    return fetchPromise;
  }

  fetchPromise = (async () => {
    try {
      const cacheBuster = Date.now();
      const url = `https://docs.google.com/spreadsheets/d/${EVENTS_CMS_SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=Events&_cb=${cacheBuster}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch Events CMS: ${response.status}`);
      }

      const text = await response.text();
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}') + 1;
      if (jsonStart === -1 || jsonEnd === 0) {
        throw new Error('Invalid JSON from CMS');
      }

      const data = JSON.parse(text.substring(jsonStart, jsonEnd));
      const rows = data?.table?.rows || [];

      const events: EventItem[] = [];

      rows.forEach((row: { c?: Array<{ v?: string | number | null, f?: string } | null> }) => {
        const cells = row.c;
        if (!cells) return;

        const id = String(cells[0]?.v || '').trim();
        // Skip header or empty rows
        if (!id || id.toLowerCase() === 'id') return;

        const name = String(cells[1]?.v || '');
        const dateCell = cells[2];
        const date = String(dateCell?.f || dateCell?.v || '');
        const type = String(cells[6]?.v || '');
        const imageUrl = String(cells[7]?.v || '').trim();
        const registrationUrl = String(cells[8]?.v || '').trim();
        const galleryUrl = String(cells[9]?.v || '').trim();
        const statusRaw = String(cells[10]?.v || '').trim().toLowerCase();
        const description = String(cells[11]?.v || '').trim();

        const endDateCell = cells[3];
        const endDate = String(endDateCell?.f || endDateCell?.v || '').trim();
        const startTimeCell = cells[4];
        const startTime = String(startTimeCell?.f || startTimeCell?.v || '').trim();
        const endTimeCell = cells[5];
        const endTime = String(endTimeCell?.f || endTimeCell?.v || '').trim();
        
        let status: EventItem['status'];
        if (statusRaw === 'upcoming' || statusRaw === 'ongoing' || statusRaw === 'completed') {
          status = statusRaw as EventItem['status'];
        }

        const event: EventItem = {
          id,
          name,
          date,
          type,
        };

        if (endDate) event.endDate = endDate;
        if (startTime) event.startTime = startTime;
        if (endTime) event.endTime = endTime;
        if (imageUrl) event.imageUrl = imageUrl;
        if (registrationUrl) event.registrationUrl = registrationUrl;
        if (galleryUrl) event.galleryUrl = galleryUrl;
        if (status) event.status = status;
        if (description) event.description = description;

        events.push(event);
      });

      cachedEvents = events;
      return events;
    } catch (err) {
      console.error('Error fetching CMS events:', err);
      fetchPromise = null;
      return [];
    }
  })();

  return fetchPromise;
}
