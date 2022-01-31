import clsx from "clsx";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"h1"> {}

export function Heading({ children, className, ...blockProps }: Props) {
  const blockClass = clsx(styles.block, className);

  return (
    <h1 className={blockClass} {...blockProps}>
      {children}
    </h1>
  );
}
