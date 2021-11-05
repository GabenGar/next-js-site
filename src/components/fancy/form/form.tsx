import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { FormProps } from "#types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends FormProps {
}

export function Form({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (<form
    className={blockClass} {...blockProps}
  >
    {children}
  </form>);
}
