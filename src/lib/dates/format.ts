import { format } from "date-fns"

export function formatDate(date: Date) {
  const formatedDate = format(date, "do MMMM yyyy GG");
  return formatedDate;
}

export function formatYear(date: Date) {
  const formatedYear = format(date, "yyyy");
  return formatedYear;
}

export function formatMonth(date: Date) {
  const formatedMonth = format(date, "MMMM");
  return formatedMonth;
}

export function formatTime(date: Date) {
  const formatedTime = format(date, "HH':'mm");
  return formatedTime;
}
