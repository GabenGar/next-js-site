import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/base-props";

interface Props extends BlockProps<"dd"> {}

export const DescriptionDetails = blockComponent<Props>(
  styles.details,
  ({ children, ...blockProps }) => {
    return <dd {...blockProps}>{children}</dd>;
  }
);
