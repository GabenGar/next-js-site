import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { getAccountDetails } from "#lib/account";
import { withSessionSSR } from "#server/requests";
import { useAppDispatch, useAppSelector } from "#store/redux";
import {
  getPendingCommentsAsync,
  selectPendingComments,
} from "#store/redux/reducers";
import { Page } from "#components/pages";
import { Heading } from "#components/headings";
import { CardList } from "#components/lists";
import { CommentCard } from "#components/entities/comments";

import type { InferGetServerSidePropsType } from "next";
import type { BasePageProps } from "#types/pages";

interface AdminPageProps extends BasePageProps {}

function AdminPage({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { t } = useTranslation("admin");
  const seoTags = createSEOTags({
    locale: localeInfo.locale,
    title: t("comments_title"),
    description: t("comments_desc"),
  });
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectPendingComments());

  useEffect(() => {
    dispatch(getPendingCommentsAsync());
  }, []);

  return (
    <Page seoTags={seoTags}>
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
        localeInfo: {
          locale: locale!,
          defaultLocale: defaultLocale!,
        },
      },
    };
  }
);

export default AdminPage;
