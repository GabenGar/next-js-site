import { useClassName } from "#lib/hooks";
import { Header } from "./header";
import { Heading } from "./heading";
import styles from "./section.module.scss";

import type { BaseProps } from "#types";

interface Props extends BaseProps {
  heading?: string;
}

export function Section({ heading, children, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (<section
    className={blockClass} {...blockProps}
  >
    {heading && (
      <Header>
        <Heading>
          {heading}
        </Heading>
      </Header>
    )}
    {children}
  </section>);
}
