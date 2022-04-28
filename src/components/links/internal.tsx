import Link from "next/link";
import clsx from "clsx";
import { blockComponent } from "#components/meta";
import { HTMLA } from "#components/html/a";
import styles from "./_index.module.scss";

import type {
  HTMLAttributeAnchorTarget,
  ReactNode,
  MouseEventHandler,
} from "react";
import type { LinkProps } from "next/link";

export interface ILinkInternalProps extends Omit<LinkProps, "passHref"> {
  target?: HTMLAttributeAnchorTarget;
  iconID?: string;
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const LinkInternal = blockComponent(styles.block, Component);

function Component({
  iconID,
  children,
  target = "_self",
  className,
  onClick,
  ...blockProps
}: ILinkInternalProps) {
  const linkClass = clsx(styles.internal, className);

  return (
    <Link {...blockProps} passHref>
      <HTMLA
        className={linkClass}
        target={target}
        iconID={iconID}
        onClick={onClick}
      >
        {children}
      </HTMLA>
    </Link>
  );
}
