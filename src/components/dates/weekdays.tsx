import {
  nowISO,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  formatWeekDay,
} from "#lib/dates";
import { blockComponent } from "#components/meta";
import { List, ListItem } from "#components/lists";
import styles from "./weekdays.module.scss";

import type { BlockProps } from "#types/props";
import type { BCPLangTag } from "#lib/language";

export interface IWeekDaysProps extends BlockProps<"div"> {
  locale?: BCPLangTag;
}

export const WeekDays = blockComponent<IWeekDaysProps>(styles.block, Component);

function Component({ locale, ...blockProps }: IWeekDaysProps) {
  const weekDays = getWeekDays();

  return (
    <div {...blockProps}>
      <List className={styles.list}>
        {weekDays.map((day) => {
          return (
            <ListItem key={day} className={styles.item}>
              <span className={styles.long}>{formatWeekDay(day)}</span>
              <span className={styles.short}>{formatWeekDay(day, true)}</span>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

function getWeekDays() {
  const now = nowISO();
  const start = startOfWeek(now);
  const end = endOfWeek(now);
  const weekDays = eachDayOfInterval(start, end);
  return weekDays;
}
