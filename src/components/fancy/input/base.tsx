import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"input"> {}

export const Input = blockComponent<Props>(
  styles.block,
  ({ id, name, ...blockProps }) => {
    return <input id={id} name={name} {...blockProps} />;
  }
);
