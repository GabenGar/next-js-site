import { useTranslation } from "next-i18next";
import { toAccountClient } from "#lib/account";
import { nowISO } from "#lib/dates";
import { createSEOTags } from "#lib/seo";
import {
  createProtectedProps,
} from "#server/requests";
import { Page } from "#components/pages";
import { Article, ArticleBody, ArticleHeader } from "#components/articles";
import { DL, DS } from "#components/lists/d-list";
import { DateTimeView } from "#components/dates";
import { Calendar } from "#components/calendar";

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient } from "#types/entities";

interface ICalendarPageProps {
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

export const getServerSideProps = createProtectedProps<ICalendarPageProps>(
  { extraLangNamespaces: ["account"] },
  async (context, { account }) => {
    const accountClient = toAccountClient(account);

    return {
      props: {
        account: accountClient,
      },
    };
  }
);

export default CalendarPage;
