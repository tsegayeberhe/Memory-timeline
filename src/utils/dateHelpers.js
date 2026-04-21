import { format, parseISO } from 'date-fns';

export function formatDate(dateString) {
  return format(parseISO(dateString), 'MMM d, yyyy');
}

export function formatDateForInput(dateString) {
  return format(parseISO(dateString), 'yyyy-MM-dd');
}

export function getMonthLabel(dateString) {
  return format(parseISO(dateString), 'MMM');
}

export function buildTimelineKey(dateString) {
  const date = parseISO(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}
