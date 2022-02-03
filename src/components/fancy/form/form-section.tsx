import clsx from "clsx";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"fieldset"> {
}

export function FormSection({ children, className, ...blockProps }: Props) {
  const blockClass = clsx(styles.section, className);

  return (<fieldset
    className={blockClass} {...blockProps}
  >
    {children}
  </fieldset>);
}
