import Head from "next/head";
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
import { ImageFigure } from "#components/images";
import { DL, DS, DT, DD } from "#components/lists/d-list";
import styles from "./about.module.scss";

function AboutPage() {
  const pageTitle = "About me";

  return (
    <Page heading={pageTitle} pageClassName={styles.block}>
      <Head>
        <title>{siteTitle(pageTitle)}</title>
        <meta name="description" content="The profile of mine." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Article>
        <ArticleHeader>
          <Heading level={2} className={styles.heading}>
            Gaben Bengar
          </Heading>
        </ArticleHeader>
        <ArticleBody>
          <ImageFigure
            src={AdminPhoto}
            alt="Totally the photo of mine"
            figCaption="Totally me"
            imageHeight="20em"
          />
          <p>
            I am an aspiring <del>rapper</del> <ins>frontend developer</ins>{" "}
            from Musohranovo, Russia.
          </p>
          <Heading level={3}>Skills</Heading>
          <DL className={styles.skills}>
            <DS className={styles.annotation}>
              <DT>Tech</DT>
              <DD>...subtechs</DD>
            </DS>
            <DS>
              <DT>HTML</DT>
              <DD>JSX</DD>{" "}
              <DD>PUG (formerly Jade)</DD>{" "}
              <DD>Jinja</DD>
            </DS>
            <DS>
              <DT>CSS</DT>
              <DD>SASS</DD>{" "}
              <DD>CCS modules</DD>
            </DS>
            <DS>
              <DT>Javascript</DT>
              <DD>React</DD>{" "}
              <DD>NextJS</DD>{" "}
              <DD>Webpack</DD>{" "}
              <DD>NodeJS</DD>{" "}
              <DD>Express</DD>
            </DS>
            <DS>
              <DT>
                Database
              </DT>
              <DD>PostgreSQL</DD>
            </DS>
          </DL>
        </ArticleBody>
        {/* <ArticleFooter></ArticleFooter> */}
      </Article>
    </Page>
  );
}

export default AboutPage;
