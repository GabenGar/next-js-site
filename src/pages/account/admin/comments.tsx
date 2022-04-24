import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { siteTitle } from "#lib/util";
import { getAccountDetails } from "#lib/account";
import { withSessionSSR } from "#server/requests";
import { useAppDispatch, useAppSelector } from "#store/redux";
import {
  selectComments,
  getPendingCommentsAsync,
  selectPendingComments,
} from "#store/redux/reducers";
import { Page } from "#components/pages";
import { Heading } from "#components/headings";
import { CardList } from "#components/lists";
import { CommentCard } from "#components/entities/comments";

import type { InferGetServerSidePropsType } from "next";
import type { BasePageProps } from "#types/pages";
import { useEffect } from "react";

interface AdminPageProps extends BasePageProps {}

function AdminPage({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("admin");
  const dispatch = useAppDispatch();
  const title = t("comments_title");
  const comments = useAppSelector(selectPendingComments());

  useEffect(() => {
    dispatch(getPendingCommentsAsync());
  }, []);

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={t("comments_desc")} />
      </Head>
      <Heading level={2}>Pending for approval</Heading>
      <CardList>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            isReplyShown={false}
          />
        ))}
      </CardList>
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<AdminPageProps>(
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

    if (account.role !== "administrator") {
      return {
        notFound: true,
      };
    }

    const localization = await serverSideTranslations(locale!, [
      "layout",
      "components",
      "admin",
    ]);

    return {
      props: {
        ...localization,
      },
    };
  }
);

export default AdminPage;
