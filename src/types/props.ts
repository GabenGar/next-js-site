import type { PropsWithChildren, ComponentPropsWithoutRef } from "react";

/**
 * Generic props for rootless components.
 */
export interface RootlessProps
  extends PropsWithChildren<Record<string, unknown>> {}

/**
 * Base props for block components.
 */
export type BlockProps<T extends keyof JSX.IntrinsicElements> =
  ComponentPropsWithoutRef<T>;

export interface ISpanProps extends BlockProps<"span"> {}
export interface IDivProps extends BlockProps<"div"> {}


