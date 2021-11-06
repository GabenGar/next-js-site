import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { FieldSetProps } from "#types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends FieldSetProps {
}

export function FormSection({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.section, className);

  return (<fieldset
    className={blockClass} {...blockProps}
  >
    {children}
  </fieldset>);
}
