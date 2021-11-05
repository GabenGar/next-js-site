import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren, ButtonHTMLAttributes } from "react";

/**
 * Generic props for rootless components.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseProps extends PropsWithChildren<Record<string, unknown>> { }

/**
 * Accepts all props related to the DOM interface of the root component.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ElementProps<DOMInterface> extends DetailedHTMLProps<HTMLAttributes<DOMInterface>, DOMInterface> { }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}
