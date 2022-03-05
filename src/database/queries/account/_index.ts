import { DAY } from "#environment/constants/durations";
import { toISODateTime } from "#lib/dates";
import { getDB } from "#database";

import type {
  IAccount,
  IAccountInit,
  IEmailConfirmation,
} from "#types/entities";

const { db } = getDB();

export async function addAccount(name: string, password: string) {
  const query = `
    INSERT INTO accounts (name, password)
    VALUES ($(name), $(password))
    RETURNING *
  `;
  const account = await db.one<IAccount>(query, { name, password });
  return account;
}

export async function addAccountEmail(account_id: number, email: string) {
  const emailQuery = `
    UPDATE accounts
    SET email = $(email), is_verified = true
    WHERE id = $(account_id)
    RETURNING *
  `;
  const confirmationQuery = `
    DELETE FROM email_confirmations
    WHERE account_id = $(account_id)
    RETURNING *
  `;
  const account = await db.one<IAccount>(emailQuery, {
    account_id,
    email,
  });
  await db.one<IEmailConfirmation>(confirmationQuery, {
    account_id,
  });

  return account;
}

export async function findAccount({ name, password }: IAccountInit) {
  const query = `
    SELECT *
    FROM accounts
    WHERE
      name = $(name)
      AND password = $(password)
  `;

  const account = await db.oneOrNone<IAccount>(query, { name, password });
  return account;
}

export async function findAccountByName({ name }: IAccountInit) {
  const query = `
    SELECT *
    FROM accounts
    WHERE
      name = $(name)
  `;

  const account = await db.oneOrNone<IAccount>(query, { name });
  return account;
}

export async function getAccount(id: number) {
  const query = `
    SELECT *
    FROM accounts
    WHERE id = $(id)
  `;

  const account = await db.oneOrNone<IAccount>(query, { id });
  return account;
}

export async function createEmailConfirmation(
  account_id: number,
  email: string,
  confirmation_key: string
) {
  const expirationDate = new Date(Date.now() + DAY);
  const expires_at = toISODateTime(expirationDate);
  const query = `
    INSERT INTO email_confirmations
      (account_id, confirmation_key, email, expires_at)
    VALUES ($(account_id), $(confirmation_key), $(email), $(expires_at))
    RETURNING *
  `;

  const confirmation = await db.one<IEmailConfirmation>(query, {
    account_id,
    confirmation_key,
    email,
    expires_at,
  });
  return confirmation;
}

export async function findEmailConfirmationByKey(
  account_id: number,
  confirmation_key: string
) {
  const query = `
    SELECT *
    FROM email_confirmations
    WHERE
      confirmation_key = $(confirmation_key)
      AND account_id = $(account_id)
  `;
  const confirmation = await db.oneOrNone<IEmailConfirmation>(query, {
    confirmation_key,
    account_id,
  });

  return confirmation;
}
