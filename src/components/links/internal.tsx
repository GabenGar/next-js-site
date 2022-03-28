import Link from "next/link";
import clsx from "clsx";
import { blockComponent } from "#components/meta";
import { HTMLA } from "#components/html/a";
import styles from "./_index.module.scss";

import type { LinkProps } from "next/link";
import type { HTMLAttributeAnchorTarget, ReactNode } from "react";

export interface ILinkInternalProps extends Omit<LinkProps, "passHref"> {
  target?: HTMLAttributeAnchorTarget;
  iconID?: string;
  className?: string;
  children?: ReactNode;
}

export const LinkInternal = blockComponent<ILinkInternalProps>(
  styles.block,
  ({ iconID, children, target = "_self", className, ...blockProps }) => {
    const linkClass = clsx(styles.internal, className);

    return (
      <Link {...blockProps} passHref>
        <HTMLA className={linkClass} target={target} iconID={iconID}>
          {children}
        </HTMLA>
      </Link>
    );
  }
);
