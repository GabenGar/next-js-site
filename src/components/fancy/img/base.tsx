import clsx from "clsx";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"img"> {}

export function IMG({ className, ...blockProps }: Props) {
  const blockClass = clsx(styles.image, className);

  return <img className={blockClass} {...blockProps}/>;
}
