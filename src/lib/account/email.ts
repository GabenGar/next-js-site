import { nanoid } from "nanoid";
import { SITE_ORIGIN } from "#environment/vars";
import {
  addAccountEmail,
  createEmailConfirmation,
  findEmailConfirmationByKey,
} from "#database/queries/account";
import { sendEmail } from "#lib/email";
import { validateEmailStringFields } from "#codegen/schema/validations";

import type { IValidationResult } from "#types/pages";

export async function validateEmailString(
  emailString: string
): Promise<IValidationResult<typeof emailString>> {
  const validationResult = await validateEmailStringFields(emailString);

  if (!validationResult.is_successful) {
    return {
      isValid: false,
      schemaValidationErrors: [...validationResult.errors],
    };
  }

  return {
    isValid: true,
    formattedResult: validationResult.data,
  };
}

export async function sendEmailConfirmation(email: string, account_id: number) {
  const confirmation_key = nanoid();
  const confirmationLink = new URL(
    `/account/email/${confirmation_key}`,
    SITE_ORIGIN
  ).toString();

  await sendEmail({
    to: email,
    subject: "Email Confirmation",
    text: `This email address was added to an account at ${SITE_ORIGIN} .\nVisit this link to confirm your email address:\n${confirmationLink} .\nIf you didn't add anything or don't know what it is, ignore this email.\n\nThis message is automatically generated, do not respond to it.`,
  });

  await createEmailConfirmation(account_id, email, confirmation_key);

  return true;
}

/**
 * TODO: check for expiration
 * @param account_id
 * @param confirmation_key
 */
export async function confirmNewEmail(
  account_id: number,
  confirmation_key: string
) {
  const confirmation = await findEmailConfirmationByKey(
    account_id,
    confirmation_key
  );

  if (!confirmation) {
    throw new Error(
      `Confirmation key for the accountID "${account_id}" does not exist.`
    );
  }

  const account = await addAccountEmail(account_id, confirmation.email);

  return account;
}
