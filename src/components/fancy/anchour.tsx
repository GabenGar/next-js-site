import Link from 'next/link';
import { useClassName } from "#lib/hooks";
import styles from "./anchour.module.scss";

import type { LinkProps } from "next/link";
import type { ReactNode } from "react";
import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLAnchorElement> {
  href: string;
}

interface LocalProps extends LinkProps {
  className?: string
  children?: ReactNode
}

export function Anchour({ href, children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (<a href={href} className={blockClass} {...blockProps}>
    {children}
  </a>);
}

export function LocalAnchour({ children, className, ...blockProps }: LocalProps) {
  const blockClass = useClassName(styles.block, styles.block_local, className);

  return (<Link {...blockProps}>
    <a className={blockClass} >
      {children}
    </a>
  </Link>);
}
