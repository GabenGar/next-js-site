import { blockComponent } from "#components";
import styles from "./button.module.scss";

import type { MouseEvent as ReactMouseEvent } from "react";
import type { BlockProps } from "#types";

interface Props extends BlockProps<"button"> {}

/**
 * Convenience interface for the `click` event.
 */
export interface ButtonClickEvent
  extends ReactMouseEvent<HTMLButtonElement, MouseEvent> {}

export const Button = blockComponent<Props>(
  styles.block,
  ({ type = "button", children, ...blockProps }) => {
    return (
      <button type={type} {...blockProps}>
        {children}
      </button>
    );
  }
);
