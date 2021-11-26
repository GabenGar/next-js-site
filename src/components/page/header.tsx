import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"header"> {}

export function Header({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.header, className);

  return (
    <header className={blockClass} {...blockProps}>
      {children}
    </header>
  );
}
