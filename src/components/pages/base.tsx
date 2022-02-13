import clsx from "clsx";
import { Heading } from "#components/headings";
import styles from "./_index.module.scss";

import type { RootlessProps } from "#types/props";

export interface PageProps extends RootlessProps {
  heading: string | JSX.Element;
  pageClassName?: string;
}

export function Page({ heading, pageClassName, children }: PageProps) {
  return (
    <>
      <Heading className={styles.heading} level={1}>
        {heading}
      </Heading>

      <section className={clsx(styles.content, pageClassName)}>
        {children}
      </section>
    </>
  );
}
