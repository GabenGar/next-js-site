import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  startOfMonth,
  getDaysInMonth,
  addDays,
  getDayNumber,
  substractDays,
  isSameDay,
  isSameMonth,
  isWeekend,
  getDayOfMonth,
  daysInWeek
} from "#lib/dates";
import { useAppDispatch, useAppSelector } from "#store/redux";
import { selectCalendar, getMonthNotes } from "#store/redux/reducers";
import { DayOverview } from "./day-overview";
import styles from "./_index.module.scss";

import type { IISODateTime } from "#codegen/schema/interfaces";

interface IMonthOverviewProps {}

/**
 * @todo Fix notes not syncing with state.
 * @todo Fix notes sorting after state change.
 */
export function MonthOverview({}: IMonthOverviewProps) {
  const dispatch = useAppDispatch();
  const { selectedDate, currentDate } = useAppSelector(selectCalendar);
  const [selectedDay, selectDay] = useState<IISODateTime>(currentDate);
  const days = populateDays(selectedDate);

  function handleSelection(dayDate: IISODateTime) {
    selectDay(dayDate);
  }

  useEffect(() => {
    dispatch(getMonthNotes(selectedDate));
  }, [dispatch, selectedDate]);

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
              {getDayOfMonth(dayDate)}
            </span>
          );
        })}
      </div>
      <DayOverview selectedDay={selectedDay} />
    </>
  );
}

/**
 * TODO: fixed length array
 */
function populateDays(selectedDate: IISODateTime) {
  /**
   * The amount of days to have consistent amount of rows between months.
   */
  const totalDays = daysInWeek * 6;
  const monthStart = startOfMonth(selectedDate);
  const daysInMonth = getDaysInMonth(monthStart);
  const monthEnd = addDays(monthStart, daysInMonth);

  // if the first day of month not monday
  // prepend needed amount of days to have full week
  const prevDays = getDayNumber(monthStart);
  const previousMonth = new Array(prevDays)
    .fill(null)
    .map((_, index) => substractDays(monthStart, index + 1))
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
