import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
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
  const router = useRouter()
  const { t } = useTranslation("common");
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: t("title"),
    description: t("description"),
    urlPath: router.pathname
  });

  return (
    <Page seoTags={seoTags}>
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

export const getStaticProps: GetStaticProps<
  IHomePageProps,
  IHomePageParams
> = async ({ locale }) => {
  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "common",
  ]);

  return {
    props: {
      ...localization,
    },
  };
};

export default Home;
