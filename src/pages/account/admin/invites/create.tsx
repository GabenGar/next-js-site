import Head from "next/head";
import { getReqBody, siteTitle } from "#lib/util";
import { getAccountDetails, withSessionSSR } from "#lib/account";
import { createInvite } from "#lib/account/admin";
import { validateInviteInitFields } from "#codegen/schema/validations";
import { Page } from "#components/pages";
import { Form } from "#components/forms";
import { ErrorsView } from "#components/errors";
import { Number } from "#components/forms/sections";

import type { InferGetServerSidePropsType } from "next";
import type { BasePageProps } from "#types/pages";
import type { IInviteInit } from "#codegen/schema/interfaces";

interface IInviteCreationProps extends BasePageProps {
  inviteInit?: IInviteInit;
}

function InviteCreationPage({
  inviteInit,
  errors,
  schemaValidationErrors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const title = "New Invite";

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={`${title} info"`} />
      </Head>
      <Form method="POST" submitButton="Create">
        <Number
          id="max-uses"
          name="max_uses"
          // @ts-expect-error TODO: fix nullish type
          defaultValue={inviteInit?.max_uses}
          minValue={1}
          valueStep={1}
        >
          Maximum uses:
        </Number>
        {errors ? (
          <ErrorsView errors={errors} />
        ) : (
          schemaValidationErrors && (
            <ErrorsView errors={schemaValidationErrors} />
          )
        )}
      </Form>
    </Page>
  );
}

export const getServerSideProps = withSessionSSR<IInviteCreationProps>(
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

    if (req.method === "POST") {
      const inviteInit = await getReqBody<IInviteInit>(req);
      const result = await validateInviteInitFields(inviteInit);

      if (!result) {
        return {
          props: {
            schemaValidationErrors: validateInviteInitFields.errors!,
            inviteInit,
          },
        };
      }

      const newInvite = await createInvite(inviteInit, account);

      return {
        redirect: {
          destination: "/account/admin/invites",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  }
);

export default InviteCreationPage;
