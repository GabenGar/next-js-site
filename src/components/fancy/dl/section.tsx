import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"div"> {}

export const DescriptionSection = blockComponent<Props>(
  styles.section,
  ({ children, className, ...blockProps }) => {
    return <div {...blockProps}>{children}</div>;
  }
);
