import styles from "./_index.module.scss";
import { Header } from "./header";
import { Heading } from "./heading";

import type { BlockProps } from "#types/props";
import clsx from "clsx";

interface Props extends BlockProps<"section"> {
  heading?: string;
}

export function Section({
  heading = undefined,
  children,
  className,
  ...blockProps
}: Props) {
  const blockClass = clsx(styles.block, className);

  return (
    <section className={blockClass} {...blockProps}>
      {heading && (
        <Header>
          <Heading>{heading}</Heading>
        </Header>
      )}
      {children}
    </section>
  );
}
