import type { MouseEvent as ReactMouseEvent } from "react";

/**
 * Convenence type for `onClick` event argument
 */
export interface OnClickEvent
  extends ReactMouseEvent<HTMLButtonElement, MouseEvent> {}
