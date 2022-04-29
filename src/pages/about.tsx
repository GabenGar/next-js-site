import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AdminPhoto } from "#assets";
import { createSEOTags } from "#lib/seo";
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

import type { ParsedUrlQuery } from "querystring";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { BasePageProps } from "#types/pages";
import { createNextURL } from "#lib/language";

interface IAboutPageProps extends BasePageProps {}

interface IAboutPageParams extends ParsedUrlQuery {}

function AboutPage({
  localeInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("about_title"),
    description: t("about_desc"),
    canonicalPath: "/about",
  });

  return (
    <Page seoTags={seoTags} pageClassName={styles.block}>
      <Article>
        <ArticleHeader>
          <Heading level={2} className={styles.heading}>
            {t("about_name")}
          </Heading>
        </ArticleHeader>
        <ArticleBody>
          <ImageFigure
            src={AdminPhoto}
            alt={t("about_photo_alt")}
            href={AdminPhoto.src}
            figCaption={t("about_photo_caption")}
            imageHeight="20em"
          />
          <Heading level={3}>{t("about_bio")}</Heading>
          {/* @TODO: long bio */}
          <p>
            I am an aspiring <del>rapper</del> <ins>frontend developer</ins>{" "}
            from Musohranovo, Russia.
          </p>
          <Heading level={3}>{t("about_skills")}</Heading>
          <DL className={styles.skills}>
            <DS className={styles.annotation}>
              <DT>{t("about_tech")}</DT>
              <DD>...{t("about_subtechs")}</DD>
            </DS>
            <DS>
              <DT>
                <SVGIcon iconID="html5" />
                <span>HTML</span>
              </DT>
              <DD>JSX</DD>
              <DD>
                {/* <SVGIcon iconID="pugjs" /> */}
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
                {/* <SVGIcon iconID="nextjs" /> */}
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
                {/* <SVGIcon iconID="postgresql-logo" /> */}
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

export const getStaticProps: GetStaticProps<
  IAboutPageProps,
  IAboutPageParams
> = async ({ locale, defaultLocale }) => {
  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "common",
  ]);

  return {
    props: {
      ...localization,
      localeInfo: {
        locale: locale!,
        defaultLocale: defaultLocale!,
      },
    },
  };
};

export default AboutPage;
