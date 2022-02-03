import clsx from "clsx";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"figure"> {}

export function Figure({ children, className, ...blockProps }: Props) {
  const blockClass = clsx(styles.block, className);

  return (
    <figure className={blockClass} {...blockProps}>
      {children}
    </figure>
  );
}
