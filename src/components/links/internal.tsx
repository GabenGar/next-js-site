import Link from "next/link";
import clsx from "clsx";
import { blockComponent } from "#components/meta";
// import { Anchour } from "#components/fancy/a";
import styles from "./_index.module.scss";

import type { LinkProps } from "next/link";
import type { HTMLAttributeAnchorTarget, ReactNode } from "react";

export interface InternalProps extends LinkProps {
  target?: HTMLAttributeAnchorTarget;
  className?: string;
  children?: ReactNode;
}

/**
 * TODO: ref component
 */
export const LinkInternal = blockComponent<InternalProps>(
  styles.block,
  ({ children, target = "_self", className, ...blockProps }) => {
    const linkClass = clsx(styles.internal, className);

    return (
      <Link {...blockProps}>
        {/* Not using `Anchour` because `Link` doesn't like it as a child element. */}
        <a className={linkClass} target={target}>
          {children}
        </a>
      </Link>
    );
  }
);
