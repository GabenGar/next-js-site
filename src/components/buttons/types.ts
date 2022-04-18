import type { MouseEvent as ReactMouseEvent } from "react";

export interface OnClickEvent
  extends ReactMouseEvent<HTMLButtonElement, MouseEvent> {}
