import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"dd"> {}

export const DescriptionDetails = blockComponent<Props>(
  styles.details,
  ({ children, ...blockProps }) => {
    return <dd {...blockProps}>{children}</dd>;
  }
);
