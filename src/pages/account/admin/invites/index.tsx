import Head from "next/head";
import { siteTitle } from "#lib/util";
import { getAccountDetails, withSessionSSR } from "#lib/account";
import { getInvites } from "#database/queries/account/admin";
import { Page } from "#components/pages";
import { JSONView } from "#components/json";
import { Article, ArticleBody } from "#components/articles";

import type { InferGetServerSidePropsType } from "next";
import type { BasePageProps } from "#types/pages";
import type { IInvite } from "#codegen/schema/interfaces";

interface IInvitesPageProps extends BasePageProps {
  invites: IInvite[];
}

function InvitesPage({
  invites,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const title = "Invites";

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={`${title} info"`} />
      </Head>
      {invites.map((invite) => (
        <Article key={invite.code}>
          <ArticleBody>
            <JSONView json={invite} />
          </ArticleBody>
        </Article>
      ))}
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<IInvitesPageProps>(
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

    if (account.role !== "administrator") {
      return {
        notFound: true,
      };
    }

    const invites = await getInvites();

    return {
      props: {
        invites,
      },
    };
  }
);

export default InvitesPage;
