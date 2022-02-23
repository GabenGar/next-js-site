import { useEffect, useState } from "react";
import {
  getDate,
  isWeekend,
  isSameDay,
  isSameMonth,
  subDays,
  getDaysInMonth,
  startOfMonth,
  addDays,
  getDay,
  daysInWeek,
} from "date-fns";
import clsx from "clsx";
import { DayOverview } from "./day-overview";
import styles from "./_index.module.scss";

interface IMonthOverviewProps {
  selectedDate: Date;
  currentDate: Date;
}

export function MonthOverview({
  selectedDate,
  currentDate,
}: IMonthOverviewProps) {
  const [selectedDay, selectDay] = useState<Date>(currentDate);
  const days = populateDays(selectedDate);

  function handleSelection(dayDate: Date) {
    selectDay(dayDate);
  }

  return (
    <>
      <div className={styles.days}>
        {days.map((dayDate, index) => {
          const className = clsx(
            styles.day,
            !isSameMonth(dayDate, selectedDate) && styles.day_other,
            isWeekend(dayDate) && styles.day_weekend,
            isSameDay(dayDate, currentDate) && styles.day_current,
            selectedDay &&
              isSameDay(selectedDay, dayDate) &&
              styles.day_selected
          );

          return (
            <span
              key={index}
              className={className}
              onClick={() => {
                handleSelection(dayDate);
              }}
            >
              {getDate(dayDate)}
            </span>
          );
        })}
      </div>
      <DayOverview selectedDay={selectedDay}></DayOverview>
    </>
  );
}

/**
 * TODO: fixed length array
 */
function populateDays(selectedDate: Date) {
  /**
   * The amount of day to have consistent amount of rows between months.
   */
  const totalDays = daysInWeek * 6;
  const monthStart = startOfMonth(selectedDate);
  const daysInMonth = getDaysInMonth(monthStart);
  const monthEnd = addDays(monthStart, daysInMonth);

  // if the first day of month not monday
  // prepend needed amount of days to have full week
  const prevDays = getDay(monthStart);
  const previousMonth = new Array(prevDays)
    .fill(null)
    .map((_, index) => subDays(monthStart, index + 1))
    .reverse();

  const currentMonth = new Array(daysInMonth)
    .fill(null)
    .map((_, index) => addDays(monthStart, index));

  // fill the rest of the calendar with next month
  const nextDays = totalDays - daysInMonth - previousMonth.length;
  const nextMonth = new Array(nextDays)
    .fill(null)
    .map((_, index) => addDays(monthEnd, index));

  const days = [...previousMonth, ...currentMonth, ...nextMonth];
  return days;
}
