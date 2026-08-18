/**
 * Configuration for the Events Page Google Sheets integration.
 * 
 * To link a Google Sheet:
 * 1. Create a Google Sheet with columns: id, name, date, type, imageUrl, registrationUrl, status
 * 2. Click "Share" -> "Publish to web"
 * 3. Choose "Entire Document" (or specific sheet) and "Comma-separated values (.csv)"
 * 4. Paste the published link below.
 * 
 * Leave empty to use local fallback data in src/data/eventsData.ts.
 */
export const GOOGLE_SHEET_CSV_URL = '';
