import { forwardRef } from "react";
import { blockComponent } from "#components/meta";
import styles from "./base.module.scss";

import type { BlockProps } from "#types/props";

export interface HTMLAProps extends BlockProps<"a"> {}

export const HTMLA = forwardRef<HTMLAnchorElement, HTMLAProps>(
  blockComponent<HTMLAProps>(
    styles.block,
    ({ href, children, ...htmlaProps }, ref) => {
      return (
        <a href={href} {...htmlaProps} ref={ref}>
          {children}
        </a>
      );
    }
  )
);
