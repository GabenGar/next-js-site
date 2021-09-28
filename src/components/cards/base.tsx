import { useClassName } from "#lib/hooks";
import styles from "./base.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLElement> {
}

export function CardBase({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (<article className={blockClass} {...blockProps}>
    {children}
  </article>);
}

export function CardHeader({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.header, className);

  return (<header className={blockClass} {...blockProps}>
    {children}
  </header>);
}

export function CardBody({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.body, className);

  return (<section className={blockClass} {...blockProps}>
    {children}
  </section>);
}

export function CardFooter({ children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.footer, className);

  return (<footer className={blockClass} {...blockProps}>
    {children}
  </footer>);
}
