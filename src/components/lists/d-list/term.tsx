import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"dt"> {}

export const DescriptionTerm = blockComponent<Props>(
  styles.term,
  ({ children, ...blockProps }) => {
    return <dt {...blockProps}>{children}</dt>;
  }
);
