import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"input"> {}

export const Input = blockComponent<Props>(
  styles.block,
  ({ id, name, ...blockProps }) => {
    return <input id={id} name={name} {...blockProps} />;
  }
);
