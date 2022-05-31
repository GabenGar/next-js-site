import { useTranslation } from "next-i18next";
import { createSEOTags } from "#lib/seo";
import { createStaticProps } from "#server/requests";
import { Page } from "#components/pages";
import { Nav, NavItem, NavList } from "#components/navigation";
import { LinkInternal } from "#components/links";
import { FELogo } from "#components/icons/logos";

import type { ParsedUrlQuery } from "querystring";
import type { InferGetStaticPropsType } from "next";

interface IHomePageProps {}

interface IHomePageParams extends ParsedUrlQuery {}

function Home({ localeInfo }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("title"),
    description: t("description"),
    canonicalPath: "/",
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

export const getStaticProps = createStaticProps<
  IHomePageProps,
  IHomePageParams
>({ extraLangNamespaces: ["common"] });

export default Home;
