import { format, formatISO9075 } from "date-fns";
import { fromISOString } from "./lib";

import type { IISODateTime } from "#codegen/schema/interfaces";

export function formatWeekDay(date: IISODateTime, isShort: boolean = false) {
  const formatString = isShort ? "EEE" : "EEEE";
  const formattedWeekDay = format(fromISOString(date), formatString);
  return formattedWeekDay;
}

export function formatDate(date: IISODateTime) {
  const formatedDate = format(fromISOString(date), "do MMMM yyyy GG");
  return formatedDate;
}

export function formatYear(date: IISODateTime) {
  const formatedYear = format(fromISOString(date), "yyyy");
  return formatedYear;
}

export function formatMonth(date: IISODateTime) {
  const formatedMonth = format(fromISOString(date), "MMMM");
  return formatedMonth;
}

export function formatTime(date: IISODateTime) {
  const formatedTime = format(fromISOString(date), "HH':'mm");
  return formatedTime;
}

/**
 * @returns A string in format `yyyy-mm-dd`.
 * Values are numbers.
 */
export function formatDateStamp(date: IISODateTime) {
  const formatedTime = formatISO9075(fromISOString(date), {
    representation: "date",
  });
  return formatedTime;
}
