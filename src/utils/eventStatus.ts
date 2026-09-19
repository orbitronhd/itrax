import type { EventItem } from '../types/events';

/**
 * Parses a date string and optional time string into a Date object in IST timezone.
 */
function parseISTDateTime(dateStr: string, timeStr?: string, isEnd: boolean = false): Date {
  if (dateStr.includes('TBD') || dateStr.includes('TBA') || dateStr.includes('TBH')) {
    return new Date(8640000000000000); // Far future
  }

  // Replace hyphens with slashes so 'YYYY-MM-DD' parses as local time instead of UTC
  const normalizedDateStr = dateStr.replace(/-/g, '/');
  const d = new Date(normalizedDateStr);
  
  if (isNaN(d.getTime())) {
    return new Date(8640000000000000);
  }

  const yyyy = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  
  const timePart = timeStr ? `${timeStr}:00` : (isEnd ? '23:59:59' : '00:00:00');
  
  // Create an ISO string specifying +05:30 (IST)
  const isoString = `${yyyy}-${MM}-${dd}T${timePart}+05:30`;
  const result = new Date(isoString);
  
  return isNaN(result.getTime()) ? d : result;
}

/**
 * Computes the status of an event based on current time (IST) vs event start/end times.
 * This overrides any status provided by the CMS.
 */
export function computeEventStatus(event: EventItem): 'upcoming' | 'ongoing' | 'completed' {
  const now = new Date();
  const startDate = parseISTDateTime(event.date, event.startTime, false);
  const endDate = parseISTDateTime(event.endDate || event.date, event.endTime, true);

  if (now < startDate) {
    return 'upcoming';
  } else if (now >= startDate && now <= endDate) {
    return 'ongoing';
  } else {
    return 'completed';
  }
}

/**
 * Maps over an array of events and explicitly overrides their status with the dynamically computed real status.
 */
export function overrideEventStatuses(events: EventItem[]): EventItem[] {
  return events.map((event) => ({
    ...event,
    status: computeEventStatus(event)
  }));
}


/**
 * Returns true if the event is upcoming or ongoing.
 */
export function isActiveEvent(event: EventItem): boolean {
  const status = computeEventStatus(event);
  return status === 'upcoming' || status === 'ongoing';
}
