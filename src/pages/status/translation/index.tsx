import { useRouter } from "next/router";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getLanguagesOverview, getMaxLineCount } from "#lib/translation";
import { createSEOTags } from "#lib/seo";
import { Page } from "#components/pages";
import { DL, DS, DT, DD } from "#components/lists/d-list";
import { LanguageView } from "#components/language";
import styles from "./index.module.scss";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";
import type { LanguagesOverview } from "#lib/translation";

interface ITemplatePageProps extends BasePageProps {
  totalCount: number;
  languagesOverview: LanguagesOverview;
}

interface ITranslationPageParams extends ParsedUrlQuery {}

/**
 * @TODO Per language details
 */
function TranslationPage({
  totalCount,
  languagesOverview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: t("translation_title"),
    description: t("translation_desc"),
    urlPath: router.pathname,
  });

  return (
    <Page seoTags={seoTags}>
      <DL className={styles.list}>
        {Object.entries(languagesOverview).map(([lang, count]) => (
          <DS key={lang} className={styles.item}>
            <DT className={styles.lang}>
              <LanguageView className={styles.tag} langString={lang} />
            </DT>
            <DD className={styles.stat}>
              <>
                <meter
                  min={0}
                  max={totalCount}
                  low={totalCount - 1}
                  optimum={totalCount}
                  high={totalCount}
                  value={count}
                >
                  {count} / {totalCount}
                </meter>{" "}
                <span className={clsx(count === totalCount && styles.complete)}>
                  {((count / totalCount) * 100).toFixed(0)}%
                </span>
              </>
            </DD>
          </DS>
        ))}
      </DL>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<
  ITemplatePageProps,
  ITranslationPageParams
> = async ({ locale }) => {
  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "common",
  ]);

  const totalLineCount = await getMaxLineCount();
  const languagesOverview = await getLanguagesOverview();

  return {
    props: {
      ...localization,
      totalCount: totalLineCount,
      languagesOverview: languagesOverview,
    },
  };
};

export default TranslationPage;
