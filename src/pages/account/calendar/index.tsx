import { useState } from "react";
import Head from "next/head";
import { IS_DEVELOPMENT } from "#environment/derived";
import { siteTitle } from "#lib/util";
import { getAccountDetails, withSessionSSR } from "#lib/account";
import { Page } from "#components/pages";
import { JSONView } from "#components/json";
import { Article, ArticleBody, ArticleHeader } from "#components/articles";
import { DL, DS } from "#components/lists/d-list";
import { DateTimeView } from "#components/dates";
import { Calendar } from "#components/calendar";

import type { InferGetServerSidePropsType } from "next";
import type { AccountClient } from "#types/entities";
import type { BasePageProps } from "#types/pages";

interface ICalendarPageProps extends BasePageProps {
  account: AccountClient;
}

function CalendarPage({
  account,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentDate, changeCurrentDate] = useState(new Date());

  return (
    <Page heading="Calendar">
      <Head>
        <title>{siteTitle("Calendar")}</title>
        <meta name="description" content="Calendar info" />
      </Head>
      <Article>
        <ArticleHeader>
          <DL>
            <DS
              dKey="Current Date"
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
  async ({ req }) => {

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
    return {
      props: {
        account: accountClient,
      },
    };
  }
);

export default CalendarPage;
