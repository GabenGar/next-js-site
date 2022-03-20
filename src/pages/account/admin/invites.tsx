import Head from "next/head";
import { IS_DEVELOPMENT } from "#environment/derived";
import { siteTitle } from "#lib/util";
import { getAccountDetails, withSessionSSR } from "#lib/account";
import { Page } from "#components/pages";
import { JSONView } from "#components/json"

import type { InferGetServerSidePropsType } from "next";
import type { IAccountClient } from "#types/entities";
import type { BasePageProps } from "#types/pages";

interface ITemplatePageProps extends BasePageProps {
  account: IAccountClient;
}

function InvitesPage({
  account,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page heading="Template page">
      <Head>
        <title>{siteTitle("Template page")}</title>
        <meta name="description" content="Template page info" />
      </Head>
      {IS_DEVELOPMENT && <JSONView json={account} />}
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<ITemplatePageProps>(
  async ({ req }) => {
    if (!IS_DEVELOPMENT) {
      return {
        notFound: true,
      };
    }

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

    if (account.role !== "administrator") {
      return {
        notFound: true,
      }
    }

    const { id, password, ...accountClient } = account;
    return {
      props: {
        account: accountClient,
      },
    };
  }
);

export default InvitesPage;
