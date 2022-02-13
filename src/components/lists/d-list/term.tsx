import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface IDTermProps extends BlockProps<"dt"> {}

export const DTerm = blockComponent<IDTermProps>(
  styles.term,
  ({ children, ...blockProps }) => {
    return <dt {...blockProps}>{children}</dt>;
  }
);
