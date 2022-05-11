import { useTranslation } from "next-i18next";
import {
  formatMonth,
  formatYear,
  addMonths,
  addYears,
  subtractMonths,
  subtractYears,
} from "#lib/dates";
import { useAppDispatch, useAppSelector } from "#browser/store/redux";
import { changeSelectedDate, selectCalendar } from "#browser/store/redux/reducers";
import { blockComponent } from "#components/meta";
import { Button } from "#components/buttons";
import { MonthOverview } from "./month-overview";
import styles from "./_index.module.scss";

import type { IDivProps } from "#types/props";
import type { IISODateTime } from "#codegen/schema/interfaces";

export interface ICalendarProps extends IDivProps {
  currentDate: IISODateTime;
}

export const Calendar = blockComponent<ICalendarProps>(styles.block, Component);

function Component({ currentDate, ...blockProps }: ICalendarProps) {
  const { t } = useTranslation("components");
  const dispatch = useAppDispatch();
  const { selectedDate } = useAppSelector(selectCalendar);

  function previousYear() {
    const newDate = subtractYears(selectedDate, 1);
    dispatch(changeSelectedDate(newDate));
  }

  function nextYear() {
    const newDate = addYears(selectedDate, 1);
    dispatch(changeSelectedDate(newDate));
  }

  function previousMonth() {
    const newDate = subtractMonths(selectedDate, 1);
    dispatch(changeSelectedDate(newDate));
  }
  function nextMonth() {
    const newDate = addMonths(selectedDate, 1);
    dispatch(changeSelectedDate(newDate));
  }

  return (
    <div {...blockProps}>
      <div className={styles.year}>
        <Button
          className={styles.button}
          iconID="chevron-left"
          onClick={previousYear}
        >
          {t("previous")}
        </Button>
        <span>{formatYear(selectedDate)}</span>
        <Button
          className={styles.button}
          iconID="chevron-right"
          onClick={nextYear}
        >
          {t("next")}
        </Button>
      </div>
      <div className={styles.month}>
        <Button
          className={styles.button}
          iconID="chevron-left"
          onClick={previousMonth}
        >
          {t("previous")}
        </Button>
        <span>{formatMonth(selectedDate)}</span>
        <Button
          className={styles.button}
          iconID="chevron-right"
          onClick={nextMonth}
        >
          {t("next")}
        </Button>
      </div>
      <MonthOverview />
    </div>
  );
}
