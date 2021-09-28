import { useClassName } from "#lib/hooks";
import styles from "./heading.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLHeadingElement> {
}

export function Heading({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (<h1 className={blockClass} {...blockProps}>
    {children}
  </h1>);
}
