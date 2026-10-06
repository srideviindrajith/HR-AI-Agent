import type { ParsedRequest, RequestType, PolicyDocument } from './types';

const typeLabels: Record<RequestType, string> = {
  annual_leave: 'Annual Leave',
  sick_leave: 'Sick Leave',
  remote_work: 'Remote Work',
  work_from_home: 'Work From Home',
  comp_off: 'Compensatory Off',
};

function detectType(input: string): RequestType {
  const lower = input.toLowerCase();

  if (lower.includes('work from home') || lower.includes('wfh') || lower.includes('from home')) {
    return 'work_from_home';
  }
  if (lower.includes('remote')) return 'remote_work';
  if (lower.includes('sick') || lower.includes('ill') || lower.includes('unwell') || lower.includes('fever') || lower.includes('not feeling')) {
    return 'sick_leave';
  }
  if (lower.includes('comp off') || lower.includes('compensatory')) return 'comp_off';
  if (lower.includes('leave') || lower.includes('vacation') || lower.includes('day off') || lower.includes('time off') || lower.includes('off')) {
    return 'annual_leave';
  }

  return 'annual_leave';
}

function extractDates(input: string): string[] {
  const lower = input.toLowerCase();
  const today = new Date('2026-10-04');
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const monthsShort = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const dates: string[] = [];

  const monthDayMatch = lower.match(/(?:on\s+)?(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/);
  if (monthDayMatch) {
    const day = parseInt(monthDayMatch[1]);
    const monthName = monthDayMatch[2];
    const monthIdx = months.includes(monthName) ? months.indexOf(monthName) : monthsShort.indexOf(monthName);
    const year = monthIdx < today.getMonth() ? today.getFullYear() + 1 : today.getFullYear();
    const date = new Date(year, monthIdx, day);
    dates.push(formatDate(date));
  }

  const dayMonthMatch = lower.match(/(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?/);
  if (dayMonthMatch && dates.length === 0) {
    const monthName = dayMonthMatch[1];
    const day = parseInt(dayMonthMatch[2]);
    const monthIdx = months.includes(monthName) ? months.indexOf(monthName) : monthsShort.indexOf(monthName);
    const year = monthIdx < today.getMonth() ? today.getFullYear() + 1 : today.getFullYear();
    const date = new Date(year, monthIdx, day);
    dates.push(formatDate(date));
  }

  if (dates.length === 0) {
    for (const dayName of days) {
      if (lower.includes(dayName)) {
        const dayIdx = days.indexOf(dayName);
        const currentDay = today.getDay();
        let diff = dayIdx - currentDay;
        if (diff <= 0) diff += 7;
        if (lower.includes('next')) diff += 7;
        const date = new Date(today);
        date.setDate(today.getDate() + diff);
        dates.push(formatDate(date));
        break;
      }
    }
  }

  if (dates.length === 0) {
    if (lower.includes('tomorrow')) {
      const date = new Date(today);
      date.setDate(today.getDate() + 1);
      dates.push(formatDate(date));
    } else if (lower.includes('today')) {
      dates.push(formatDate(today));
    }
  }

  if (dates.length === 0) {
    const date = new Date(today);
    date.setDate(today.getDate() + 11);
    dates.push(formatDate(date));
  }

  return dates;
}

function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function extractReason(input: string): string {
  const lower = input.toLowerCase();
  const patterns = [
    /(?:because|since|as|due to|for|reason is)\s+(.+)/,
    /(?:i have|i need to|i want to|i've got)\s+(.+)/,
  ];

  for (const pattern of patterns) {
    const match = lower.match(pattern);
    if (match && match[1] && match[1].length > 3) {
      return match[1].trim().charAt(0).toUpperCase() + match[1].trim().slice(1);
    }
  }

  return 'Personal reasons';
}

export function parseRequest(input: string): ParsedRequest {
  const type = detectType(input);
  const dates = extractDates(input);
  const reason = extractReason(input);

  return {
    type,
    typeLabel: typeLabels[type],
    dates,
    reason,
    rawInput: input,
    confidence: 0.94,
  };
}

export function findRelevantPolicy(
  type: RequestType,
  policies: PolicyDocument[]
): PolicyDocument | null {
  const tagMap: Record<RequestType, string[]> = {
    annual_leave: ['annual_leave'],
    sick_leave: ['sick_leave'],
    remote_work: ['remote_work'],
    work_from_home: ['remote_work', 'work_from_home'],
    comp_off: ['comp_off'],
  };

  const tags = tagMap[type];
  const found = policies.find((p) => p.tags.some((t) => tags.includes(t)));
  return found || null;
}

export function checkEligibility(type: RequestType, balance: number): { eligible: boolean; message: string } {
  if (type === 'annual_leave' && balance < 3) {
    return { eligible: false, message: 'Insufficient annual leave balance. A minimum of 3 days must be retained for emergencies.' };
  }
  if (balance <= 0) {
    return { eligible: false, message: 'No remaining balance for this leave type.' };
  }
  return { eligible: true, message: 'You are eligible for this request. Policy requirements are met.' };
}
