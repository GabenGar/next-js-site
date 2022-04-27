import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { IS_DEVELOPMENT } from "#environment/derived";
import { getAccountDetails, confirmNewEmail } from "#lib/account";
import { createSEOTags } from "#lib/seo";
import { withSessionSSR } from "#server/requests";
import { Page } from "#components/pages";
import { LinkInternal } from "#components/links";

import type { InferGetServerSidePropsType } from "next";
import type { BasePageProps } from "#types/pages";
import type { ParsedUrlQuery } from "querystring";

interface AccountEmailProps extends BasePageProps {
  email?: string;
}

interface AccountEmailParams extends ParsedUrlQuery {
  code: string;
}

function EmailConfirmationPage({
  email,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { t } = useTranslation("account");
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: t("email_code_title"),
    description: t("email_code_desc"),
  });

  return (
    <Page seoTags={seoTags}>
      {email && (
        // @ts-expect-error children error
        <p>
          {(t("email_code_message"), { email: email })}{" "}
          <LinkInternal href="/account">
            {t("email_code_message_acc")}
          </LinkInternal>
          .
        </p>
      )}
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<
  AccountEmailProps,
  AccountEmailParams
>(async ({ req, params }) => {
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

  const { code } = params!;

  const { email } = await confirmNewEmail(account_id, code);

  return {
    props: {
      email,
    },
  };
});

export default EmailConfirmationPage;
