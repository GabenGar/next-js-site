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
      (account_id, full_name, avatar_url)
    VALUES ($(account_id), $(full_name), $(avatar_url))
    RETURNING *
  `;
  const queryArgs = {
    account_id: accountID,
    full_name: profileInit.full_name,
    avatar_url: profileInit.avatar_file,
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

export async function getProfiles() {
  const query = `
    SELECT *
    FROM accounts.profiles
  `;

  const accountProfile = await db.manyOrNone<IAccountProfile>(query);

  return accountProfile;
}
