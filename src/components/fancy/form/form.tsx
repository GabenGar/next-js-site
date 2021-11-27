import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"form"> {}

export const Form = blockComponent<Props>(
  styles.block,
  ({ id, method, children, ...blockProps }) => {
    return (
      <form id={id} method={method} {...blockProps}>
        {children}
      </form>
    );
  }
);
