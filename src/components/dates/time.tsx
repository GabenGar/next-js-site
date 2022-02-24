import { formatTime, toISODateTime } from "#lib/dates";
import { blockComponent } from "#components/meta";
import styles from "./time.module.scss";

import type { BlockProps } from "#types/props";

export interface ITimeViewProps extends Omit<BlockProps<"time">, "dateTime"> {
  /**
   * The string is assumed to be an ISO string.
   */
  dateTime: Date;
}

export const TimeView = blockComponent<ITimeViewProps>(
  styles.block,
  ({ dateTime, children, ...blockProps }) => {
    return (
      <time {...blockProps} dateTime={toISODateTime(dateTime)}>
        {children ? children : formatTime(dateTime)}
      </time>
    );
  }
);
