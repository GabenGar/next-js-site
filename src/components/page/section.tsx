import styles from "./section.module.scss";

import type { BaseProps } from "#types";
import { useClassName } from "#lib/hooks";

interface Props extends BaseProps<HTMLElement> {
}

export function Section({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName([styles.block, className]);
  
  return (<section
    className={blockClass} {...blockProps}
  >
    {children}
  </section>);
}
