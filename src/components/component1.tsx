import { useClassName } from "#lib/hooks";
import styles from "./component1.module.scss";

import type { BaseProps } from "#types";

interface Props extends BaseProps<HTMLDivElement> {
}

export function ComponentOne({ className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className)
  return (<div className={blockClass} {...blockProps}>
    Component 1
  </div>)
}
