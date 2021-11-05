import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { InputProps } from "#types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends InputProps {}

export function Input({ className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return <input className={blockClass} {...blockProps} />;
}
