import clsx from "clsx";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { LoadingBar } from "#components/state";
import { Heading } from "#components/headings";
import styles from "./_index.module.scss";

import type { ReactNode } from "react";
import type { NextSeoProps } from "next-seo";
import type { RootlessProps } from "#types/props";

export interface PageProps extends RootlessProps {
  seoTags: NextSeoProps;
  heading?: ReactNode;
  pageClassName?: string;
}

export function Page({ seoTags, heading, pageClassName, children }: PageProps) {
  const router = useRouter();
  const pageClass = clsx(
    styles.content,
    !heading && !seoTags.title && styles.content_headless,
    pageClassName
  );

  return (
    <>
      <NextSeo {...seoTags} />
      <Heading className={styles.heading} level={1}>
        {heading ? heading : seoTags.title}
      </Heading>

      <section className={pageClass}>
        {router?.isFallback ? <LoadingBar /> : children}
      </section>
    </>
  );
}
