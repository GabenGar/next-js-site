import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/base-props";

interface Props extends BlockProps<"fieldset"> {
}

export function FormSection({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.section, className);

  return (<fieldset
    className={blockClass} {...blockProps}
  >
    {children}
  </fieldset>);
}
