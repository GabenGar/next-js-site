import { useTranslation } from "next-i18next";
import { createStaticProps } from "#server/requests";

import type { InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";

interface IProps extends BasePageProps {}

interface IParams extends ParsedUrlQuery {}

function Custom404({}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <h1>404 - Page Not Found</h1>;
}

export const getStaticProps = createStaticProps<IProps, IParams>({
  extraLangNamespaces: ["common"],
});

export default Custom404;
