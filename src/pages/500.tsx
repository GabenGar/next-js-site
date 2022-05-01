import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import type { GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";

interface IProps extends BasePageProps {}

interface IParams extends ParsedUrlQuery {}

function Custom500() {
  return <h1>500 - Server-side error occurred</h1>;
}

export const getStaticProps: GetStaticProps<IProps, IParams> = async ({
  locale,
  defaultLocale,
}) => {
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

export default Custom500;
