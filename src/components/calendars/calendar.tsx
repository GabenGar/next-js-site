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
  isMonday,
  isSaturday,
  isSameDay,
  isSameMonth,
  daysInWeek
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

function populateDays(selectedDate: Date) {
  const monthStart = startOfMonth(selectedDate);
  const daysInMonth = getDaysInMonth(monthStart);

  const monthDays = new Array(daysInMonth).fill(null).map((value, index) => {
    return addDays(monthStart, index - 1);
  });

  const firstDay = monthDays[0];
  const lastDay = monthDays[monthDays.length - 1];

  if (!isMonday(firstDay)) {
    const day = getDay(firstDay);
    const pastMonth = new Array(day)
      .fill(null)
      .map((value, index) => {
        return subDays(firstDay, index + 1);
      })
      .reverse();

    monthDays.unshift(...pastMonth);
  }

  if (!isSaturday(lastDay)) {
    const day = getDay(lastDay);
    const nextMonth = new Array(7 - day).fill(null).map((value, index) => {
      return addDays(lastDay, index + 1);
    });

    monthDays.push(...nextMonth);
  }

  return monthDays;
}
