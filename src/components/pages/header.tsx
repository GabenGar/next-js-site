import clsx from "clsx";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"header"> {}

export function Header({ children, className, ...blockProps }: Props) {
  const blockClass = clsx(styles.header, className);

  return (
    <header className={blockClass} {...blockProps}>
      {children}
    </header>
  );
}
