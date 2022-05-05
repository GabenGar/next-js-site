import { getDB } from "#database";

import type {
  IAccountProfile,
  IAccountProfileInit,
  ISerialInteger,
} from "#types/entities";

const { db } = getDB();

/**
 * @TODO create avatar url after profile creation
 */
export async function addProfile(
  profileInit: IAccountProfileInit,
  accountID: ISerialInteger
) {
  const query = `
    INSERT INTO accounts.profiles
      (account_id, full_name)
    VALUES ($(account_id), $(full_name))
    RETURNING *
  `;
  const queryArgs = {
    account_id: accountID,
    full_name: profileInit.full_name,
  };

  const newProfile = await db.one<IAccountProfile>(query, queryArgs);

  return newProfile;
}

export async function getProfile(id: ISerialInteger) {
  const query = `
    SELECT *
    FROM accounts.profiles
    WHERE id = $(id)
  `;
  const queryArgs = {
    id,
  };

  const accountProfile = await db.one<IAccountProfile>(query, queryArgs);

  return accountProfile;
}

export async function getProfiles(page: number) {
  const query = `
    SELECT *
    FROM accounts.profiles
    ORDER BY id
  `;

  const accountProfile = await db.manyOrNone<IAccountProfile>(query);

  return accountProfile;
}
