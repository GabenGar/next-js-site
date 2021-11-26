import { useClassName } from "#lib/hooks";
import styles from "./button.module.scss";

import type { MouseEvent as ReactMouseEvent } from "react";
import type { BlockProps } from "#types";

interface Props extends BlockProps<"button"> {}

/**
 * Convenience interface for the `click` event.
 */
export interface ButtonClickEvent
  extends ReactMouseEvent<HTMLButtonElement, MouseEvent> {}

export function Button({
  children,
  className,
  type = "button",
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.block, className);

  return (
    <button
      className={blockClass}
      type={type}
      {...blockProps}
    >
      {children}
    </button>
  );
}
