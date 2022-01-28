import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/base-props";

interface Props extends BlockProps<"img"> {}

export function IMG({ className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.image, className);

  return <img className={blockClass} {...blockProps}/>;
}
