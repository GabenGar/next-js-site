import { parseISO, formatISO, minTime, maxTime } from "date-fns";

import type { IISODateString, DateLike } from "./types";

/**
 * Validates `DateLike` value and casts it to `Date` if needed.
 */
export function validateDateLike(date: DateLike) {
  if (date instanceof Date) {
    return date;
  }

  return fromISOString(date);
}

export function isAllowedTime(time: number) {
  return time >= minTime && time <= maxTime;
}

export function fromISOString(dateString: IISODateString): Date {
  return parseISO(dateString);
}

export function toISODateTime(date: Date): string {
  return formatISO(date, { representation: "complete" });
}

export function toISOTime(date: Date): string {
  return formatISO(date, { representation: "time" });
}

export function toISODate(date: Date): string {
  return formatISO(date, { representation: "date" });
}

export function isISOString(dateString: IISODateString) {
  try {
    parseISO(dateString);
    return true;
  } catch (error) {
    return false;
  }
}
