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
import { SVGIcon } from "#components/icons";
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
          <Heading level={3}>Bio</Heading>
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
              <DT>
                <SVGIcon iconID="html5" />
                <span>HTML</span>
              </DT>
              <DD>JSX</DD>
              <DD>
                <SVGIcon iconID="pugjs" />
                <span>PUG (formerly Jade)</span>
              </DD>
              <DD>
                {/* TODO: fix markup and styles */}
                {/* <SVGIcon iconID="jinja" /> */}
                <span>Jinja</span>
              </DD>
            </DS>
            <DS>
              <DT>
                <SVGIcon iconID="css3-alt" />
                <span>CSS</span>
              </DT>
              <DD>
                <SVGIcon iconID="sass" />
                <span>SASS</span>
              </DD>
              <DD>CSS modules</DD>
            </DS>
            <DS>
              <DT>
                <SVGIcon iconID="js" />
                <span>Javascript</span>
              </DT>
              <DD>
                <SVGIcon iconID="react" />
                <span>React</span>
              </DD>
              <DD>
              <SVGIcon iconID="nextjs" />
                <span>NextJS</span>
              </DD>
              <DD>
                <span>Webpack</span>
              </DD>
              <DD>
                <SVGIcon iconID="node-js" />
                <span>NodeJS</span>
              </DD>
              <DD>
                <span>Express</span>
              </DD>
            </DS>
            <DS>
              <DT>
                <SVGIcon iconID="database" />
                <span>Database</span>
              </DT>
              <DD>
                <SVGIcon iconID="postgresql-logo" />
                <span>PostgreSQL</span>
              </DD>
            </DS>
          </DL>
        </ArticleBody>
        {/* <ArticleFooter></ArticleFooter> */}
      </Article>
    </Page>
  );
}

export default AboutPage;
