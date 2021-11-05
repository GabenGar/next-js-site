// copy-paste the entire code for the new root components
import { useClassName } from "#lib/hooks";
import styles from "./template.module.scss";

import type { ElementProps } from "#types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ElementProps<HTMLElement> {}

function Template({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (
    <section className={blockClass} {...blockProps}>
      {children}
    </section>
  );
}
