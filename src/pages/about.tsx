import Head from "next/head";
import Image from "next/image";
import { AdminPhoto } from "#assets";
import { siteTitle } from "#lib/util";
import { Page } from "#components/pages";
import {
  Article,
  ArticleHeader,
  ArticleBody,
  ArticleFooter,
} from "#components/articles";
import { Heading } from "#components/headings";
import { DL, DS } from "#components/lists/d-list";
import styles from "./about.module.scss"

function AboutPage() {
  const pageTitle = "About me";

  return (
    <Page heading={pageTitle}>
      <Head>
        <title>{siteTitle("About me")}</title>
        <meta name="description" content="The profile of mine." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Article>
        <ArticleHeader>
          <Heading level={2} className={styles.heading}>Gaben Bengar</Heading>
        </ArticleHeader>
        <ArticleBody>
          <Image
            src={AdminPhoto}
            alt="Totally the photo of mine"
            className={styles.photo}
          />
          <p>
            I am an aspiring <del>rapper</del>
            <ins>frontend developer</ins> from Musohranovo, Russia.
          </p>
          <DL></DL>
        </ArticleBody>
        {/* <ArticleFooter></ArticleFooter> */}
      </Article>
    </Page>
  );
}

export default AboutPage;
