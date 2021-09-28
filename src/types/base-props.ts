import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";

/**
 * Generic props for rootless components.
 */
export interface BaseProps extends PropsWithChildren<{}> { }

/**
 * Accepts all props related to the DOM interface of the root component.
 */
export interface ElementProps<DOMInterface> extends DetailedHTMLProps<HTMLAttributes<DOMInterface>, DOMInterface> { }
