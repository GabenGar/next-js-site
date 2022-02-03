import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

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
