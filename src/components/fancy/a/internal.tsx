import Link from "next/link";
import { useClassName } from "#lib/hooks";
import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { LinkProps } from "next/link";
import type { ReactNode } from "react";

interface LocalProps extends LinkProps {
  is_external?: boolean;
  className?: string;
  children?: ReactNode;
}

export const InternalAnchour = blockComponent(
  styles.block,
  ({ children, className, is_external = false, ...blockProps }: LocalProps) => {
    const blockClass = useClassName(
      styles.block_local,
      className
    );

    return (
      <Link {...blockProps}>
        <a className={blockClass} target={is_external ? "_blank" : "_self"}>
          {children}
        </a>
      </Link>
    );
  }
);
