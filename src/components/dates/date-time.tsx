import { formatDate, fromISOString, toISODateTime } from "#lib/dates";
import { blockComponent } from "#components/meta";
import styles from "./date-time.module.scss";

import type { BlockProps } from "#types/props";

export interface IDateTimeViewProps
  extends Omit<BlockProps<"time">, "dateTime"> {
  /**
   * The string is assumed to be an ISO string.
   */
  dateTime: Date;
}

export const DateTimeView = blockComponent<IDateTimeViewProps>(
  styles.block,
  ({ dateTime, children, ...blockProps }) => {
    return (
      <time {...blockProps} dateTime={toISODateTime(dateTime)}>
        {children ? children : formatDate(dateTime)}
      </time>
    );
  }
);
