import {
  parseISO,
  formatISO,
  startOfMonth as startOfMonthfn,
  getDaysInMonth as getDaysInMonthfn,
  getDay,
  getDate as getDatefn,
} from "date-fns";

import type { IISODateTime } from "#codegen/schema/interfaces";

export function getDayOfMonth(date: IISODateTime) {
  return getDatefn(fromISOString(date));
}

export function getDaysInMonth(date: IISODateTime) {
  return getDaysInMonthfn(fromISOString(date));
}

export function getDayNumber(date: IISODateTime) {
  return getDay(fromISOString(date));
}

export function startOfMonth(date: IISODateTime) {
  return toISODateTime(startOfMonthfn(fromISOString(date)));
}

/**
 * @returns An ISO timestamp equivalent of `new Date()`.
 */
export function getNowISO() {
  return toISODateTime(new Date());
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
