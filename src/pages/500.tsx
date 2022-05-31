import { useTranslation } from "next-i18next";
import { createStaticProps } from "#server/requests";

import type { ParsedUrlQuery } from "querystring";
import type { InferGetStaticPropsType } from "next";

interface IProps {}

interface IParams extends ParsedUrlQuery {}

function Custom500({}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <h1>500 - Server-side error occurred</h1>;
}

export const getStaticProps = createStaticProps<IProps, IParams>({
  extraLangNamespaces: ["common"],
});

export default Custom500;
