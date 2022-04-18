import { blockComponent } from "#components/meta";
import styles from "./list.module.scss";

import type { BlockProps } from "#types/props";

export interface IButtonList extends BlockProps<"div"> {}

/**
 * Holds a list of buttons.
 */
export const ButtonList = blockComponent(styles.block, Component);

function Component({ children, ...blockProps }: IButtonList) {
  return <div {...blockProps}>{children}</div>;
}
