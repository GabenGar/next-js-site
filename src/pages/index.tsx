import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { createNextURL } from "#lib/language";
import { Page } from "#components/pages";
import { Nav, NavItem, NavList } from "#components/navigation";
import { LinkInternal } from "#components/links";
import { FELogo } from "#components/icons/logos";

import type { ParsedUrlQuery } from "querystring";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { BasePageProps } from "#types/pages";

interface IHomePageProps extends BasePageProps {}

interface IHomePageParams extends ParsedUrlQuery {}

function Home({ localeInfo }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");
  const seoTags = createSEOTags({
    locale: localeInfo.locale,
    title: t("title"),
    description: t("description"),
    urlPath: createNextURL(localeInfo, "/").toString(),
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

export default Home;
