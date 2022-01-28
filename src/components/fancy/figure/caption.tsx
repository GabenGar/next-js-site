import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/base-props";

interface Props extends BlockProps<"figcaption"> {}

export function FigCaption({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.caption, className);

  return (
    <figcaption className={blockClass} {...blockProps}>
      {children}
    </figcaption>
  );
}
