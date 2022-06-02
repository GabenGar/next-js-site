import { useTranslation } from "next-i18next";
import { IS_DEVELOPMENT } from "#environment/derived";
import { confirmNewEmail } from "#lib/account";
import { createSEOTags } from "#lib/seo";
import { createProtectedProps } from "#server/requests";
import { Page } from "#components/pages";
import { LinkInternal } from "#components/links";

import type { InferGetServerSidePropsType } from "next";
import type { ParsedUrlQuery } from "querystring";

interface IProps {
  email?: string;
}

interface IParams extends ParsedUrlQuery {
  code: string;
}

function EmailConfirmationPage({
  localeInfo,
  email,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("account");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("email_code_title"),
    description: t("email_code_desc"),
  });

  return (
    <Page seoTags={seoTags}>
      {email && (
        <p>
          <>
            {(t("email_code_message"), { email: email })}{" "}
            <LinkInternal href="/account">
              {t("email_code_message_acc")}
            </LinkInternal>
            .
          </>
        </p>
      )}
    </Page>
  );
}

export const getServerSideProps = createProtectedProps<IProps, IParams>(
  { extraLangNamespaces: ["account"] },
  async (context, { account }) => {
    const { params } = context;
    if (!IS_DEVELOPMENT) {
      return {
        notFound: true,
      };
    }

    const { code } = params!;

    const { email } = await confirmNewEmail(account.id, code);

    return {
      props: {
        email,
      },
    };
  }
);

export default EmailConfirmationPage;
