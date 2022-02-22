import { useState } from "react";
import {
  addMonths,
  subDays,
  subMonths,
  subYears,
  addYears,
  getDaysInMonth,
  startOfMonth,
  addDays,
  getDay,
  daysInWeek,
} from "date-fns";
import { formatMonth, formatYear } from "#lib/dates";
import { blockComponent } from "#components/meta";
import { Button } from "#components/buttons";
import { SVGIcon } from "#components/icons";
import { MonthOverview } from "./month-overview";
import styles from "./_index.module.scss";

import type { IDivProps } from "#types/props";
import type { ICalendarNote } from "#types/entities";

export interface ICalendarProps extends IDivProps {
  currentDate: Date;
}

export const Calendar = blockComponent<ICalendarProps>(
  styles.block,
  ({ currentDate, ...blockProps }) => {
    const [selectedDate, changeSelectedDate] = useState(currentDate);
    const [notes, changeNotes] = useState<ICalendarNote[]>([]);
    const days = populateDays(selectedDate);

    function previousYear() {
      const newDate = subYears(selectedDate, 1);
      changeSelectedDate(newDate);
    }

    function nextYear() {
      const newDate = addYears(selectedDate, 1);
      changeSelectedDate(newDate);
    }

    function previousMonth() {
      const newDate = subMonths(selectedDate, 1);
      changeSelectedDate(newDate);
    }
    function nextMonth() {
      const newDate = addMonths(selectedDate, 1);
      changeSelectedDate(newDate);
    }

    return (
      <div {...blockProps}>
        <div className={styles.year}>
          <Button className={styles.button} onClick={previousYear}>
            <SVGIcon iconID="chevron-left" />
            <span>Previous</span>
          </Button>
          <span>{formatYear(selectedDate)}</span>
          <Button className={styles.button} onClick={nextYear}>
            <SVGIcon iconID="chevron-right" />
            <span>Next</span>
          </Button>
        </div>
        <div className={styles.month}>
          <Button className={styles.button} onClick={previousMonth}>
            <SVGIcon iconID="chevron-left" />
            <span>Previous</span>
          </Button>
          <span>{formatMonth(selectedDate)}</span>
          <Button className={styles.button} onClick={nextMonth}>
            <SVGIcon iconID="chevron-right" />
            <span>Next</span>
          </Button>
        </div>
        <MonthOverview
          days={days}
          selectedDate={selectedDate}
          currentDate={currentDate}
        />
      </div>
    );
  }
);

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
