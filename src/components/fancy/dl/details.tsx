import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLElement> {}

export function DescriptionDetails({
  children,
  className,
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.details, className);
  return (
    <dd className={blockClass} {...blockProps}>
      {children}
    </dd>
  );
}
