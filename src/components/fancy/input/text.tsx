import { useClassName } from "#lib/hooks";
import { Input } from "./base";
import styles from "./_index.module.scss";

import type { InputProps } from "#types";

interface Props extends InputProps {}

export function TextInput({ className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.text, className);

  return (
    <Input className={blockClass} {...blockProps} type="text"/>
  );
}
