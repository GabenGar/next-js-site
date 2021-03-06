import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { getLanguagesOverview, getMaxLineCount } from "#lib/translation";
import { createSEOTags } from "#lib/seo";
import { createStaticProps } from "#server/requests";
import { Page } from "#components/pages";
import { DL, DS, DT, DD } from "#components/lists/d-list";
import { LanguageView } from "#components/language";
import styles from "./index.module.scss";

import type { InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { LanguagesOverview } from "#lib/translation";

interface IProps {
  totalCount: number;
  languagesOverview: LanguagesOverview;
}

interface IParams extends ParsedUrlQuery {}

/**
 * @TODO Per language details
 */
function TranslationPage({
  localeInfo,
  totalCount,
  languagesOverview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("translation_title"),
    description: t("translation_desc"),
    canonicalPath: "/status/translation",
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

export const getStaticProps = createStaticProps<IProps, IParams>({
  extraLangNamespaces: ["common"],
}, async () => {

  const totalLineCount = await getMaxLineCount();
  const languagesOverview = await getLanguagesOverview();

  return {
    props: {
      totalCount: totalLineCount,
      languagesOverview: languagesOverview,
    },
  };
});

export default TranslationPage;
