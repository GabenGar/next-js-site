import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { DescriptionListProps } from "#types";

interface Props extends DescriptionListProps {}

export function DescriptionList({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);
  return (
    <dl className={blockClass} {...blockProps}>
      {children}
    </dl>
  );
}
