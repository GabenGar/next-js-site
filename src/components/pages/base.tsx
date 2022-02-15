import clsx from "clsx";
import { Heading } from "#components/headings";
import styles from "./_index.module.scss";

import type { ReactNode } from "react";
import type { RootlessProps } from "#types/props";

export interface PageProps extends RootlessProps {
  heading?: ReactNode;
  pageClassName?: string;
}

export function Page({ heading, pageClassName, children }: PageProps) {
  const pageClass = clsx(
    styles.content,
    !heading && styles.content_headless,
    pageClassName
  );
  return (
    <>
      {heading && (
        <Heading className={styles.heading} level={1}>
          {heading}
        </Heading>
      )}

      <section className={pageClass}>{children}</section>
    </>
  );
}
