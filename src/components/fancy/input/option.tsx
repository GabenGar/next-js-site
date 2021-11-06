import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { OptionProps } from "#types";

interface Props extends OptionProps {}

export function Option({ className, children, ...blockProps }: Props) {
  const blockClass = useClassName(styles.option, className);

  return (
    <option className={blockClass} {...blockProps}>
      {children}
    </option>
  );
}
