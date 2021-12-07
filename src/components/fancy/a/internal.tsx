import Link from "next/link";
import { useClassName } from "#lib/hooks";
import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { LinkProps } from "next/link";
import type { ReactNode } from "react";

interface LocalProps extends LinkProps {
  isExternal?: boolean;
  className?: string;
  children?: ReactNode;
}

export const InternalAnchour = blockComponent<LocalProps>(
  styles.block,
  ({ children, className, isExternal = false, ...blockProps }) => {
    const blockClass = useClassName(
      styles.block_local,
      className
    );

    return (
      <Link {...blockProps}>
        <a className={blockClass} target={isExternal ? "_blank" : "_self"}>
          {children}
        </a>
      </Link>
    );
  }
);
