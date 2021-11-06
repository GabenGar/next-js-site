import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { SelectProps } from "#types";

interface Props extends SelectProps {}

export function Select({ className, children, ...blockProps }: Props) {
  const blockClass = useClassName(styles.select, className);

  return (
    <select className={blockClass} {...blockProps}>
      {children}
    </select>
  );
}
