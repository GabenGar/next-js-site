import styles from "./_index.module.scss";

import type { BlockProps } from "#types";
import { blockComponent } from "#components";

interface Props extends BlockProps<"dt"> {}

export const DescriptionTerm = blockComponent<Props>(
  styles.term,
  ({ children, ...blockProps }) => {
    return <dt {...blockProps}>{children}</dt>;
  }
);
