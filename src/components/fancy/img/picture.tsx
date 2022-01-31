import clsx from "clsx";
import { IMG } from "./base";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"picture"> {}

export function Picture({ children, className, ...blockProps }: Props) {
  const blockClass = clsx(styles.picture, className);

  return (
    <picture className={blockClass} {...blockProps}>
      {children}
    </picture>
  );
}
