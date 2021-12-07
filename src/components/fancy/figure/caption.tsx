import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { BaseProps } from "#types";

interface Props extends BaseProps {}

export function FigCaption({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.caption, className);

  return (
    <figcaption className={blockClass} {...blockProps}>
      {children}
    </figcaption>
  );
}
