import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { BaseProps } from "#types";

interface Props extends BaseProps {}

export function Figure({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (
    <figure className={blockClass} {...blockProps}>
      {children}
    </figure>
  );
}
