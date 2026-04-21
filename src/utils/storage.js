const STORAGE_KEY = 'memory-timeline-events';

export function loadEvents() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Could not load events from storage', error);
    return [];
  }
}

export function saveEvents(events) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error('Could not save events to storage', error);
  }
}
