import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"select"> {}

export const Select = blockComponent<Props>(
  styles.select,
  ({ id, name, children, ...blockProps }) => {
    return (
      <select id={id} name={name} {...blockProps}>
        {children}
      </select>
    );
  }
);
