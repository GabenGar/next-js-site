import { format } from "date-fns";
import { validateDateLike } from "./lib";

import type { DateLike } from "./types";

export function formatDate(date: DateLike) {
  const finalDate = validateDateLike(date);
  const formatedDate = format(finalDate, "do MMMM yyyy GG");
  return formatedDate;
}

export function formatYear(date: DateLike) {
  const finalDate = validateDateLike(date);
  const formatedYear = format(finalDate, "yyyy");
  return formatedYear;
}

export function formatMonth(date: DateLike) {
  const finalDate = validateDateLike(date);
  const formatedMonth = format(finalDate, "MMMM");
  return formatedMonth;
}

export function formatTime(date: DateLike) {
  const finalDate = validateDateLike(date);
  const formatedTime = format(finalDate, "HH':'mm");
  return formatedTime;
}
