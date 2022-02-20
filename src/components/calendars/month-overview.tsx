import { useState } from "react";
import { getDate, isWeekend, isSameDay, isSameMonth } from "date-fns";
import clsx from "clsx";
import styles from "./_index.module.scss";

interface IMonthOverviewProps {
  selectedDate: Date;
  currentDate: Date;
  days: Date[];
}

export function MonthOverview({
  days,
  selectedDate,
  currentDate,
}: IMonthOverviewProps) {
  const [selectedDay, selectDay] = useState<Date>();

  function handleSelection(dayDate: Date) {
    const nextSelection =
      selectedDay && isSameDay(selectedDay, dayDate) ? undefined : dayDate;
    selectDay(nextSelection);
  }

  return (
    <div className={styles.days}>
      {days.map((dayDate, index) => {
        const className = clsx(
          styles.day,
          !isSameMonth(dayDate, selectedDate) && styles.day_other,
          isWeekend(dayDate) && styles.day_weekend,
          isSameDay(dayDate, currentDate) && styles.day_current,
          selectedDay && isSameDay(selectedDay, dayDate) && styles.day_selected
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
  );
}
