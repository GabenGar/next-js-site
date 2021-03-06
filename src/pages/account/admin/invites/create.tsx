import { useTranslation } from "next-i18next";
import { FOUND } from "#environment/constants/http";
import { createSEOTags } from "#lib/seo";
import {
  getReqBody,
  Redirect,
  createAdminProps,
} from "#server/requests";
import { createInvite } from "#lib/account/admin";
import { validateInviteInitFields } from "#codegen/schema/validations";
import { Page } from "#components/pages";
import { Form } from "#components/forms";
import { ErrorsView } from "#components/errors";
import { Number, Select } from "#components/forms/sections";
import { addWeeks, addMonths, nowISO, addYears } from "#lib/dates";

import type { InferGetServerSidePropsType } from "next";
import type { IInviteInit } from "#codegen/schema/interfaces";
import type { IOptionProps } from "#components/forms/sections";

interface IProps {
  inviteInit?: IInviteInit;
}

function InviteCreationPage({
  localeInfo,
  inviteInit,
  errors,
  schemaValidationErrors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("admin");
  const seoTags = createSEOTags({
    localeInfo,
    title: "New Invite",
    description: "New invite overview.",
  });
  const selectOptions: IOptionProps[] = [
    {
      optionTitle: "Never",
      value: "",
    },
    { optionTitle: "1 week", value: addWeeks(nowISO(), 1) },
    { optionTitle: "1 month", value: addMonths(nowISO(), 1) },
    { optionTitle: "1 year", value: addYears(nowISO(), 1) },
  ];

  return (
    <Page seoTags={seoTags}>
      <Form method="POST" submitButton="Create">
        <Select id="expires-at" name="expires_at" options={selectOptions}>
          Expires in:
        </Select>
        {/* <DateTime
          id="expires-at"
          name="expires_at"
          defaultValue={inviteInit?.expires_at ?? addWeeks(nowISO(), 1)}
          minDate={nowISO()}
        >
          Expires at:
        </DateTime> */}
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

export const getServerSideProps = createAdminProps<IProps>(
  { extraLangNamespaces: ["admin"] },
  async (context, { account }) => {
    const { req } = context;

    if (req.method === "POST") {
      const inviteInit = await getReqBody<IInviteInit>(req);
      const validationResult = await validateInviteInitFields(inviteInit);

      if (!validationResult.is_successful) {
        return {
          props: {
            schemaValidationErrors: validationResult.errors,
            inviteInit,
          },
        };
      }

      const newInvite = await createInvite(inviteInit, account);

      return Redirect.fromContext(context, "/account/admin/invites", FOUND);
    }

    return {
      props: {},
    };
  }
);

export default InviteCreationPage;
