import { parseISO, formatISO, minTime, maxTime } from "date-fns";

import type { IISODateTime } from "#codegen/schema/interfaces";

export function isAllowedTime(time: number) {
  return time >= minTime && time <= maxTime;
}

export function fromISOString(dateString: IISODateTime): Date {
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

export function isISOString(dateString: IISODateTime) {
  try {
    parseISO(dateString);
    return true;
  } catch (error) {
    return false;
  }
}
