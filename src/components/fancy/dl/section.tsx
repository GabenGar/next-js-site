import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { DivProps } from "#types";

interface Props extends DivProps {}

export function DescriptionSection({
  children,
  className,
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.section, className);
  return (
    <div className={blockClass} {...blockProps}>
      {children}
    </div>
  );
}
