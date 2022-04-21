import { blockComponent } from "#components/meta";
import styles from "./list.module.scss";

import type { BlockProps } from "#types/props";

export interface IButtonListProps extends BlockProps<"div"> {}

/**
 * Holds a list of buttons.
 */
export const ButtonList = blockComponent(styles.block, Component);

function Component({ children, ...blockProps }: IButtonListProps) {
  return <div {...blockProps}>{children}</div>;
}
