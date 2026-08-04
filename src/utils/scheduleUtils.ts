import { BranchName } from '../types';

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const BRANCH_SCHEDULE: Record<BranchName, { days: DayOfWeek[]; label: string; hours: string }> = {
  'Kolhapur Branch': {
    days: [1, 3, 5],
    label: 'Mondays, Wednesdays & Fridays',
    hours: '10 AM – 5 PM'
  },
  'Shirol Branch (Main HQ)': {
    days: [2, 4, 6],
    label: 'Tuesdays, Thursdays & Saturdays',
    hours: '10 AM – 6 PM'
  }
};

export const SONOGRAPHY_DAYS: DayOfWeek[] = [2, 4, 6];
export const SONOGRAPHY_BRANCH: BranchName = 'Shirol Branch (Main HQ)';

export const TIME_SLOTS = ['10:30 AM', '11:00 AM'] as const;

export function getDayOfWeek(dateStr: string): DayOfWeek {
  return new Date(dateStr + 'T12:00:00').getDay() as DayOfWeek;
}

export function getDayName(day: DayOfWeek): string {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
}

export function isBranchOpenOnDate(branch: BranchName, dateStr: string): boolean {
  const day = getDayOfWeek(dateStr);
  return BRANCH_SCHEDULE[branch].days.includes(day);
}

export function isSonographyAvailable(dateStr: string): boolean {
  const day = getDayOfWeek(dateStr);
  return SONOGRAPHY_DAYS.includes(day);
}

export function getBranchForDay(day: DayOfWeek): BranchName | null {
  if (BRANCH_SCHEDULE['Kolhapur Branch'].days.includes(day)) return 'Kolhapur Branch';
  if (BRANCH_SCHEDULE['Shirol Branch (Main HQ)'].days.includes(day)) return 'Shirol Branch (Main HQ)';
  return null;
}

export function getNextAvailableDates(branch: BranchName, count = 8): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 1; dates.length < count && i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    // Use local date components to avoid UTC timezone shift issues
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    if (isBranchOpenOnDate(branch, dateStr)) dates.push(dateStr);
  }
  return dates;
}

export function formatDateDisplay(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });
}

export function getBranchForDate(dateStr: string): BranchName | null {
  const day = getDayOfWeek(dateStr);
  if (BRANCH_SCHEDULE['Kolhapur Branch'].days.includes(day)) return 'Kolhapur Branch';
  if (BRANCH_SCHEDULE['Shirol Branch (Main HQ)'].days.includes(day)) return 'Shirol Branch (Main HQ)';
  return null;
}
