import { useState } from "react";
import { addMonths, subMonths, subYears, addYears } from "date-fns";
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
          <span className={styles.info}>{formatYear(selectedDate)}</span>
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
          <span className={styles.info}>{formatMonth(selectedDate)}</span>
          <Button className={styles.button} onClick={nextMonth}>
            <SVGIcon iconID="chevron-right" />
            <span>Next</span>
          </Button>
        </div>
        <MonthOverview selectedDate={selectedDate} />
      </div>
    );
  }
);

function MonthOverview({ selectedDate }: IMonthOverviewProps) {
  return (
    <div>
      <div className={styles.days}>...days</div>
    </div>
  );
}
