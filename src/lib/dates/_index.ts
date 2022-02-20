import { parseISO, formatISO, minTime, maxTime } from "date-fns";

export { formatDate, formatMonth, formatYear, formatTime } from "./format";

export type IISODateString = string;
export type DateLike = IISODateString | Date;

export function isAllowedTime(time: number) {
  return time >= minTime && time <= maxTime;
}

export function fromISOString(dateString: IISODateString): Date {
  return parseISO(dateString);
}

export function toISOString(date: Date): string {
  return formatISO(date);
}

export function isISOString(dateString: IISODateString) {
  try {
    parseISO(dateString);
    return true;
  } catch (error) {
    return false;
  }
}
