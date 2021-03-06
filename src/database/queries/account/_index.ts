import { DAY } from "#environment/constants/durations";
import { toISODateTime } from "#lib/dates";
import { getDB } from "#database";

import type {
  IAccount,
  IAccountInit,
  IAccountProfile,
  IEmailConfirmation,
} from "#types/entities";

const { db } = getDB();

export async function addAdminAccount({ name, password }: IAccountInit) {
  const query = `
    INSERT INTO accounts.entries (name, password, role)
    VALUES ($(name), $(password), 'administrator')
    RETURNING *
  `;
  const adminAccount = await db.one<IAccount>(query, { name, password });

  return adminAccount;
}

export async function addAccount(name: string, password: string) {
  const query = `
    INSERT INTO accounts.entries (name, password)
    VALUES ($(name), $(password))
    RETURNING *
  `;
  const account = await db.one<IAccount>(query, { name, password });
  return account;
}

export async function addAccountEmail(account_id: number, email: string) {
  const emailQuery = `
    UPDATE accounts.entries
    SET email = $(email), is_verified = true
    WHERE id = $(account_id)
    RETURNING *
  `;
  const confirmationQuery = `
    DELETE FROM accounts.email_confirmations
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
    FROM accounts.entries
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
    FROM accounts.entries
    WHERE
      name = $(name)
  `;

  const account = await db.oneOrNone<IAccount>(query, { name });
  return account;
}

export async function getAccount(id: number) {
  const account_query = `
    SELECT *
    FROM accounts.entries
    WHERE id = $(id)
  `;

  const profile_query = `
    SELECT *
    FROM accounts.profiles
    WHERE account_id = $(account_id)
  `;

  const account = await db.tx(async (tx) => {
    const account = await tx.one<IAccount>(account_query, { id });
    const profile = await tx.oneOrNone<IAccountProfile>(profile_query, {
      account_id: account.id,
    });

    if (profile) {
      account.profile = profile;
    }

    return account;
  });

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
    INSERT INTO accounts.email_confirmations
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
    FROM accounts.email_confirmations
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
