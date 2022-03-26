import {
  parseISO,
  formatISO,
  startOfMonth as startOfMonthfn,
  getDaysInMonth as getDaysInMonthfn,
  getDay,
  getDate as getDatefn,
  startOfDay as startOfDayfn,
  getYear as getYearfn,
  getMonth as getMonthfn,
  startOfWeek as startOfWeekfn,
  endOfWeek as endOfWeekfn,
  eachDayOfInterval as eachDayOfIntervalfn,
} from "date-fns";

import type { Interval } from "date-fns";
import type { IISODateTime } from "#codegen/schema/interfaces";
import type { IWeekDay } from "./types";

export function eachDayOfInterval(
  start: IISODateTime,
  end: IISODateTime
): IISODateTime[] {
  const interval: Interval = {
    start: fromISOString(start),
    end: fromISOString(end),
  };
  const days = eachDayOfIntervalfn(interval).map((day) => {
    return toISODateTime(day);
  });
  return days;
}

export function startOfWeek(date: IISODateTime): IISODateTime {
  return toISODateTime(startOfWeekfn(fromISOString(date)));
}
export function endOfWeek(date: IISODateTime): IISODateTime {
  return toISODateTime(endOfWeekfn(fromISOString(date)));
}

export function getYear(date: IISODateTime) {
  return getYearfn(fromISOString(date));
}
export function getMonth(date: IISODateTime) {
  return getMonthfn(fromISOString(date));
}

export function startOfDay(date: IISODateTime): IISODateTime {
  return toISODateTime(startOfDayfn(fromISOString(date)));
}

export function getDayOfMonth(date: IISODateTime): number {
  return getDatefn(fromISOString(date));
}

export function getDaysInMonth(date: IISODateTime): number {
  return getDaysInMonthfn(fromISOString(date));
}

export function getDayNumber(date: IISODateTime): IWeekDay {
  return getDay(fromISOString(date));
}

export function startOfMonth(date: IISODateTime): IISODateTime {
  return toISODateTime(startOfMonthfn(fromISOString(date)));
}

/**
 * @returns An ISO timestamp equivalent of `new Date()`.
 */
export function nowISO(): IISODateTime {
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
