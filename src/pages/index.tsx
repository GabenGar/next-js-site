import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { siteTitle } from "#lib/util";
import { Page } from "#components/pages";
import { Nav, NavItem, NavList } from "#components/navigation";
import { LinkInternal } from "#components/links";
import { FELogo } from "#components/icons/logos";

import type { ParsedUrlQuery } from "querystring";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { BasePageProps } from "#types/pages";

interface IHomePageProps extends BasePageProps {}

interface IHomePageParams extends ParsedUrlQuery {}

function Home({}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");
  const pageTitle = t("title");

  return (
    <Page heading={pageTitle}>
      <Head>
        <title>{siteTitle(pageTitle)}</title>
        <meta name="description" content={t("description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav>
        <NavList>
          <NavItem>
            <LinkInternal href="/frontend-mentor">
              <FELogo />
              Frontend Mentor Challenges
            </LinkInternal>
          </NavItem>
        </NavList>
      </Nav>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<IHomePageProps, IHomePageParams> =
  async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale!, ["layout", "common"])),
      },
    };
  };

export default Home;
