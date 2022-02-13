import { forwardRef } from "react";
import { blockComponent } from "#components/meta";
import styles from "./base.module.scss";

import type { BlockProps } from "#types/props";

export interface HTMLAProps extends BlockProps<"a"> {}

/**
 * TODO: forward ref
 */
export const HTMLA = blockComponent<HTMLAProps>(
  styles.block,
  ({ href, children, ...htmlaProps }) => {
    return (
      <a href={href} {...htmlaProps}>
        {children}
      </a>
    );
  }
);
