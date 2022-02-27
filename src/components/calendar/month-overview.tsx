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
import { getMonthNotes } from "#lib/api/public";
import { useAppDispatch, useAppSelector } from "#store/redux";
import { selectCalendar, changeSelectedDay } from "#store/redux/reducers";
import { DayOverview } from "./day-overview";
import styles from "./_index.module.scss";

import type { ICalendarNoteClient } from "#types/entities";

interface IMonthOverviewProps {
  currentDate: Date;
}

/**
 * @todo Fix notes not syncing with state.
 * @todo Fix notes sorting after state change.
 */
export function MonthOverview({
  currentDate,
}: IMonthOverviewProps) {
  const dispatch = useAppDispatch();
  const { selectedDate } = useAppSelector(selectCalendar);
  const [selectedDay, selectDay] = useState<Date>(currentDate);
  const [monthNotes, changeMonthNotes] = useState<ICalendarNoteClient[]>([]);
  const days = populateDays(selectedDate);

  function handleSelection(dayDate: Date) {
    selectDay(dayDate);
  }

  useEffect(() => {
    (async () => {
      const {
        success,
        data: newNotes,
        errors,
      } = await getMonthNotes(selectedDate);

      if (!success || !newNotes) {
        console.error(errors);
        return;
      }

      changeMonthNotes(newNotes);
    })();
  }, [selectedDate]);

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
      <DayOverview selectedDay={selectedDay} monthNotes={monthNotes} />
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
