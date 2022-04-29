import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { getAccountDetails } from "#lib/account";
import { createNextURL } from "#lib/language";
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

function AdminPage({
  localeInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
  async ({ req, locale, defaultLocale }) => {
    const { account_id } = req.session;
    const localeInfo = { locale: locale!, defaultLocale: defaultLocale! };

    if (!account_id) {
      const redirectURL = createNextURL(localeInfo, "/auth/login").toString();

      return {
        redirect: {
          destination: redirectURL,
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
        localeInfo,
      },
    };
  }
);

export default AdminPage;
