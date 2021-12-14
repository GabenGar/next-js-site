import Link from "next/link";
import { useClassName } from "#lib/hooks";
import { blockComponent } from "#components";
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
    const blockClass = useClassName(styles.internal, className);

    return (
      <Link {...blockProps}>
        {/* Not using `Anchour` because `Link` doesn't like it as a child element. */}
        <a className={blockClass} target={isNewPage ? "_blank" : "_self"}>
          {children}
        </a>
      </Link>
    );
  }
);
