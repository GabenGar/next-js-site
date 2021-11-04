import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLElement> {}

export function DescriptionTerm({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.term, className);
  return (
    <dt className={blockClass} {...blockProps}>
      {children}
    </dt>
  );
}
