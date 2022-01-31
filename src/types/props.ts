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

/**
 * Props shared across all pages.
 */
export interface BasePageProps {
  theme?: string;
  errors?: string[] | Record<string | number, unknown>;
}
