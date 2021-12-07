import type { PropsWithChildren, ComponentPropsWithoutRef } from "react";

/**
 * Generic props for rootless components.
 */
export interface RootlessProps
  extends PropsWithChildren<Record<string, unknown>> {}

export type BlockProps<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>
