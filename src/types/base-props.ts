import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * Base `props` for all components.
 */
export interface BaseProps<DOMInterface> extends DetailedHTMLProps<HTMLAttributes<DOMInterface>, DOMInterface> {}
