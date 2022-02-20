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
  getDate,
  getDay,
  isWeekend,
  isSameDay,
  isSameMonth,
  daysInWeek,
} from "date-fns";
import clsx from "clsx";
import { formatMonth, formatYear } from "#lib/dates";
import { blockComponent } from "#components/meta";
import { Button } from "#components/buttons";
import { SVGIcon } from "#components/icons";
import styles from "./_index.module.scss";

import type { IDivProps } from "#types/props";

export interface ICalendarProps extends IDivProps {
  currentDate: Date;
}
interface IMonthOverviewProps {
  selectedDate: Date;
  currentDate: Date;
}

export const Calendar = blockComponent<ICalendarProps>(
  styles.block,
  ({ currentDate, ...blockProps }) => {
    const [selectedDate, changeSelectedDate] = useState(currentDate);

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
        <MonthOverview selectedDate={selectedDate} currentDate={currentDate} />
      </div>
    );
  }
);

function MonthOverview({ selectedDate, currentDate }: IMonthOverviewProps) {
  const days = populateDays(selectedDate);

  return (
    <div className={styles.days}>
      {days.map((dayDate, index) => {
        const className = clsx(
          styles.day,
          !isSameMonth(dayDate, selectedDate) && styles.day_other,
          isWeekend(dayDate) && styles.day_weekend,
          isSameDay(dayDate, currentDate) && styles.day_current
        );

        return (
          <span key={index} className={className}>
            {getDate(dayDate)}
          </span>
        );
      })}
    </div>
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
