import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

export interface AnchourProps extends BlockProps<"a"> {}

export const Anchour = blockComponent<AnchourProps>(
  styles.block,
  ({ href, children, ...blockProps }) => {
    return <a {...blockProps}>{children}</a>;
  }
);