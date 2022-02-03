import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface DescriptionDetailsProps extends BlockProps<"dd"> {}

export const DescriptionDetails = blockComponent<DescriptionDetailsProps>(
  styles.details,
  ({ children, ...blockProps }) => {
    return <dd {...blockProps}>{children ? children : "unknown"}</dd>;
  }
);
