import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { InputProps } from "#types";

interface Props extends InputProps {}

export function Input({ className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return <input className={blockClass} {...blockProps} />;
}
