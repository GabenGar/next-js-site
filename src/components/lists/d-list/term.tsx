import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface DescriptionTermProps extends BlockProps<"dt"> {}

export const DescriptionTerm = blockComponent<DescriptionTermProps>(
  styles.term,
  ({ children, ...blockProps }) => {
    return <dt {...blockProps}>{children}</dt>;
  }
);
