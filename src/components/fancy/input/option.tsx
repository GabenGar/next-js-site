import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/base-props";

interface Props extends BlockProps<"option"> {}

export const Option = blockComponent<Props>(
  styles.option,
  ({ children, ...blockProps }) => {
    return <option {...blockProps}>{children}</option>;
  }
);
