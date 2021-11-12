import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { AnchourProps } from "#types";

interface Props extends AnchourProps {
  href: string;
}

export function Anchour({ href, children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (
    <a
      href={href}
      className={blockClass}
      {...blockProps}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
