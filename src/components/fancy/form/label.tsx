import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"label"> {}

export const Label = blockComponent<Props>(
  styles.label,
  ({ htmlFor, children, ...blockProps }) => {
    return (
      <label htmlFor={htmlFor} {...blockProps}>
        {children}
      </label>
    );
  }
);
