import {
  subYears,
  addYears as addYearsfn,
  subMonths,
  addMonths as addMonthsfn,
  addDays as addDaysfn,
  subDays,
  addWeeks as addWeeksfn,
  subWeeks,
} from "date-fns";
import { fromISOString, toISODateTime } from "./lib";

import type { IISODateTime } from "#codegen/schema/interfaces";

export function subtractYears(date: IISODateTime, amount: number) {
  return toISODateTime(subYears(fromISOString(date), amount));
}

export function addYears(date: IISODateTime, amount: number) {
  return toISODateTime(addYearsfn(fromISOString(date), amount));
}

export function subtractMonths(date: IISODateTime, amount: number) {
  return toISODateTime(subMonths(fromISOString(date), amount));
}

export function addMonths(date: IISODateTime, amount: number) {
  return toISODateTime(addMonthsfn(fromISOString(date), amount));
}

export function addWeeks(date: IISODateTime, amount: number) {
  return toISODateTime(addWeeksfn(fromISOString(date), amount));
}

export function substractWeeks(date: IISODateTime, amount: number) {
  return toISODateTime(subWeeks(fromISOString(date), amount));
}

export function addDays(date: IISODateTime, amount: number) {
  return toISODateTime(addDaysfn(fromISOString(date), amount));
}

export function substractDays(date: IISODateTime, amount: number) {
  return toISODateTime(subDays(fromISOString(date), amount));
}
