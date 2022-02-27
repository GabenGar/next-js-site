import { useState } from "react";
import { addMonths, subMonths, subYears, addYears } from "date-fns";
import { formatMonth, formatYear } from "#lib/dates";
import { useAppDispatch, useAppSelector } from "#store/redux";
import { changeSelectedDay, selectCalendar } from "#store/redux/reducers";
import { blockComponent } from "#components/meta";
import { Button } from "#components/buttons";
import { SVGIcon } from "#components/icons";
import { MonthOverview } from "./month-overview";
import styles from "./_index.module.scss";

import type { IDivProps } from "#types/props";

export interface ICalendarProps extends IDivProps {
  currentDate: Date;
}

export const Calendar = blockComponent<ICalendarProps>(
  styles.block,
  ({ currentDate, ...blockProps }) => {
    const dispatch = useAppDispatch();
    const { selectedDate } = useAppSelector(selectCalendar);

    function previousYear() {
      const newDate = subYears(selectedDate, 1);
      dispatch(changeSelectedDay(newDate));
    }

    function nextYear() {
      const newDate = addYears(selectedDate, 1);
      dispatch(changeSelectedDay(newDate));
    }

    function previousMonth() {
      const newDate = subMonths(selectedDate, 1);
      dispatch(changeSelectedDay(newDate));
    }
    function nextMonth() {
      const newDate = addMonths(selectedDate, 1);
      dispatch(changeSelectedDay(newDate));
    }

    return (
      <div {...blockProps}>
        <div className={styles.year}>
          <Button
            className={styles.button}
            iconID="chevron-left"
            onClick={previousYear}
          >
            Previous
          </Button>
          <span>{formatYear(selectedDate)}</span>
          <Button
            className={styles.button}
            iconID="chevron-right"
            onClick={nextYear}
          >
            Next
          </Button>
        </div>
        <div className={styles.month}>
          <Button
            className={styles.button}
            iconID="chevron-left"
            onClick={previousMonth}
          >
            Previous
          </Button>
          <span>{formatMonth(selectedDate)}</span>
          <Button
            className={styles.button}
            iconID="chevron-right"
            onClick={nextMonth}
          >
            Next
          </Button>
        </div>
        <MonthOverview currentDate={currentDate} />
      </div>
    );
  }
);
