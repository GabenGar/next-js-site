import { useClassName } from "#lib/hooks";
import styles from "./header.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLElement> {
}

export function Header({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (<header className={blockClass} {...blockProps}>
    {children}
  </header>);
}
