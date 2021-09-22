import styles from "./section.module.scss";

import type { BaseProps } from "#types";

interface Props extends BaseProps<HTMLElement> {}

export function Section({ children, ...blockProps }: Props) {
  return (<section {...blockProps} className={styles.block} >
    {children}
  </section>);
}
