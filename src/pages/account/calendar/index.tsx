import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAccountDetails } from "#lib/account";
import { nowISO } from "#lib/dates";
import { createSEOTags } from "#lib/seo";
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
  account,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { t } = useTranslation("account");
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: t("calendar_title"),
    description: t("calendar_desc"),
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
  async ({ req, locale }) => {
    const { account_id } = req.session;

    if (!account_id) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
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
        account: accountClient,
      },
    };
  }
);

export default CalendarPage;
