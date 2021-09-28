import { useClassName } from "#lib/hooks";
import styles from "./button.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLButtonElement> {
}

export function Button({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (<button className={blockClass} {...blockProps}>
    {children}
  </button>);
}
