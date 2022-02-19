import { formatDate, fromISOString, toISOString } from "#lib/dates";
import { blockComponent } from "#components/meta";
import styles from "./date-time.module.scss";

import type { BlockProps } from "#types/props";

export interface IDateViewProps extends Omit<BlockProps<"time">, "dateTime"> {
  /**
   * The string is assumed to be an ISO string.
   */
  dateTime: string | Date;
}

export const DateView = blockComponent<IDateViewProps>(
  styles.block,
  ({ dateTime, children, ...blockProps }) => {
    const date = dateTime instanceof Date ? dateTime : fromISOString(dateTime);

    return (
      <time {...blockProps} dateTime={toISOString(date)}>
        {children ? children : formatDate(date)}
      </time>
    );
  }
);
