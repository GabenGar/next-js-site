import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FOUND } from "#environment/constants/http";
import { getAccountDetails } from "#lib/account";
import { nowISO } from "#lib/dates";
import { createSEOTags } from "#lib/seo";
import { createNextURL } from "#lib/language";
import { withSessionSSR } from "#server/requests";
import { Page } from "#components/pages";
import { Article, ArticleBody, ArticleHeader } from "#components/articles";
import { DL, DS } from "#components/lists/d-list";
import { DateTimeView } from "#components/dates";
import { Calendar } from "#components/calendar";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient } from "#types/entities";
import type { BasePageProps } from "#types/pages";

interface ICalendarPageProps extends BasePageProps {
  account: IAccountClient;
}

function CalendarPage({
  localeInfo,
  account,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("account");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("calendar_title"),
    description: t("calendar_desc"),
    canonicalPath: "/account/calendar",
  });
  const currentDate = nowISO();

  return (
    <Page seoTags={seoTags}>
      <Article>
        <ArticleHeader>
          <DL>
            <DS
              dKey={t("current_date")}
              dValue={<DateTimeView dateTime={currentDate} />}
            />
          </DL>
        </ArticleHeader>
        <ArticleBody>
          <Calendar currentDate={currentDate} />
        </ArticleBody>
      </Article>
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<ICalendarPageProps>(
  async ({ req, locale, defaultLocale }) => {
    const { account_id } = req.session;
    const localeInfo = { locale: locale!, defaultLocale: defaultLocale! };

    if (!account_id) {
      const redirectURL = createNextURL(localeInfo, "/auth/login").toString();

      return {
        redirect: {
          statusCode: FOUND,
          destination: redirectURL,
        },
      };
    }

    const account = await getAccountDetails(account_id);

    if (!account) {
      req.session.destroy();

      return {
        notFound: true,
      };
    }
    const { id, password, ...accountClient } = account;
    const localization = await serverSideTranslations(locale!, [
      "layout",
      "components",
      "account",
    ]);

    return {
      props: {
        ...localization,
        localeInfo,
        account: accountClient,
      },
    };
  }
);

export default CalendarPage;
