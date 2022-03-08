import {
  parseISO,
  minTime,
  maxTime,
  isSameMonth as isSameMonthfn,
  isWeekend as isWeekendfn,
  isSameDay as isSameDayfn,
  compareAsc,
  compareDesc
} from "date-fns";
import { fromISOString } from "./lib";

import type { IISODateTime } from "#codegen/schema/interfaces";

export function compareDescending(
  dateLeft: IISODateTime,
  dateRight: IISODateTime
) {
  return compareDesc(fromISOString(dateLeft), fromISOString(dateRight));
}

export function compareAscending(
  dateLeft: IISODateTime,
  dateRight: IISODateTime
) {
  return compareAsc(fromISOString(dateLeft), fromISOString(dateRight));
}

export function isSameMonth(dateLeft: IISODateTime, dateRight: IISODateTime) {
  return isSameMonthfn(fromISOString(dateLeft), fromISOString(dateRight));
}
export function isWeekend(date: IISODateTime) {
  return isWeekendfn(fromISOString(date));
}
export function isSameDay(dateLeft: IISODateTime, dateRight: IISODateTime) {
  return isSameDayfn(fromISOString(dateLeft), fromISOString(dateRight));
}
export function isAllowedTime(time: number) {
  return time >= minTime && time <= maxTime;
}
export function isISOString(dateString: IISODateTime) {
  try {
    parseISO(dateString);
    return true;
  } catch (error) {
    return false;
  }
}
