import { useClassName } from "#lib/hooks";
import { IMG } from "./base";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"picture"> {}

export function Picture({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.picture, className);

  return (
    <picture className={blockClass} {...blockProps}>
      {children}
    </picture>
  );
}
