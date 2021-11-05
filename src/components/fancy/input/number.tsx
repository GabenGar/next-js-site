import { useClassName } from "#lib/hooks";
import { Input } from "./base";
import styles from "./_index.module.scss";

import type { InputProps } from "#types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends InputProps {}

export function NumberInput({ className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.number, className);

  return (
    <Input className={blockClass} {...blockProps} type="number"/>
  );
}
