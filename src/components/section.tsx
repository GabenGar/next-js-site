import styles from "./section.module.scss";

import type { BaseProps } from "src/types/_index";

interface Props extends BaseProps<HTMLElement> { }

export function Section({ children, ...blockProps }: Props) {
  return (<section {...blockProps} className={[styles.block, blockProps.className].join(" ")} >
    {children}
  </section>);
}
