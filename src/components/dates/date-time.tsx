import { formatDate } from "#lib/dates";
import { blockComponent } from "#components/meta";
import styles from "./date-time.module.scss";

import type { BlockProps } from "#types/props";
import type { IISODateTime } from "#codegen/schema/interfaces";

export interface IDateTimeViewProps
  extends Omit<BlockProps<"time">, "dateTime"> {
  /**
   * The string is assumed to be an ISO string.
   */
  dateTime: IISODateTime;
}

export const DateTimeView = blockComponent<IDateTimeViewProps>(
  styles.block,
  ({ dateTime, children, ...blockProps }) => {
    return (
      <time {...blockProps} dateTime={dateTime}>
        {children ? children : formatDate(dateTime)}
      </time>
    );
  }
);
