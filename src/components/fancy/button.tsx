import { debounce } from "#lib/util";
import { blockComponent } from "#components/meta";
import styles from "./button.module.scss";

import type { MouseEvent as ReactMouseEvent } from "react";
import type { BlockProps } from "#types/base-props";

interface Props extends BlockProps<"button"> {}

/**
 * Convenience interface for the `click` event.
 */
export interface ButtonClickEvent
  extends ReactMouseEvent<HTMLButtonElement, MouseEvent> {}

export const Button = blockComponent<Props>(
  styles.block,
  ({ type = "button", onClick, children, ...blockProps }) => {
    return (
      <button
        type={type}
        onClick={onClick ? debounce(onClick, 250) : undefined}
        {...blockProps}
      >
        {children}
      </button>
    );
  }
);
