import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"h1"> {}

export function Heading({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (
    <h1 className={blockClass} {...blockProps}>
      {children}
    </h1>
  );
}
