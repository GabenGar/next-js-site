import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { BaseProps } from "#types";

interface Props extends BaseProps {}

function Template({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (
    <section className={blockClass} {...blockProps}>
      {children}
    </section>
  );
}
