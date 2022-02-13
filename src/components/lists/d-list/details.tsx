import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface IDDetailsProps extends BlockProps<"dd"> {}

export const DDetails = blockComponent<IDDetailsProps>(
  styles.details,
  ({ children, ...blockProps }) => {
    return <dd {...blockProps}>{children ? children : "unknown"}</dd>;
  }
);
