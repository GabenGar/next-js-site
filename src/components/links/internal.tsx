import Link from "next/link";
import clsx from "clsx";
import { blockComponent } from "#components/meta";
import { Anchour } from "#components/fancy/a";
import styles from "./_index.module.scss";

import type { LinkProps } from "next/link";
import type { ReactNode } from "react";

export interface InternalProps extends LinkProps {
  /**
   * Opens a new page/tab if `true`.
   */
  isNewPage?: boolean;
  className?: string;
  children?: ReactNode;
}

export const LinkInternal = blockComponent<InternalProps>(
  styles.block,
  ({ children, className, isNewPage = false, ...blockProps }) => {
    const linkClass = clsx(styles.internal, className);

    return (
      <Link {...blockProps}>
        {/* Not using `Anchour` because `Link` doesn't like it as a child element. */}
        <a className={linkClass} target={isNewPage ? "_blank" : "_self"}>
          {children}
        </a>
      </Link>
    );
  }
);
