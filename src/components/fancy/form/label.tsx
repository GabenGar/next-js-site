import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { LabelProps } from "#types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends LabelProps {
}

export function Label({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.label, className);

  return (<label
    className={blockClass} {...blockProps}
  >
    {children}
  </label>);
}
