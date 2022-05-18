import { toPagination } from "#lib/pagination";
import { countTable, getDB } from "#database";

import type {
  IAccountProfile,
  IAccountProfileInit,
  ISerialInteger,
} from "#types/entities";
import type { IPaginationDB } from "#lib/pagination";

const { db } = getDB();

/**
 * @TODO create avatar url after profile creation
 */
export async function addProfile(
  accountID: ISerialInteger,
  profileInit: IAccountProfileInit
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

export async function getProfiles(paginationDB: IPaginationDB) {
  const { offset, limit } = paginationDB;
  const query = `
    SELECT *
    FROM accounts.profiles
    ORDER BY id
    OFFSET $(offset)
    LIMIT $(limit)
  `;
  const queryArgs = {
    offset,
    limit,
  };

  const result = await db.task(async (tx) => {
    const profileCount = await countTable({
      ctx: tx,
      schema: "accounts",
      table: "profiles",
    });
    const profiles = await tx.manyOrNone<IAccountProfile>(query, queryArgs);
    const pagination = toPagination(paginationDB, profileCount);

    return {
      pagination,
      profiles,
    };
  });

  return result;
}

export async function addProfileAvatar(
  profileID: ISerialInteger,
  avatarURL: string
) {
  const query = `
    UPDATE accounts.profiles
    SET avatar_url = $(avatar_url)
    WHERE id = $(profile_id)
    RETURNING *
  `;
  const queryArgs = {
    avatar_url: avatarURL,
    profile_id: profileID,
  };

  const profile = await db.one<IAccountProfile>(query, queryArgs);

  return profile;
}

export async function removeProfile(
  accountID: ISerialInteger,
  profileID: ISerialInteger
) {
  const query = `
    DELETE FROM accounts.profiles
    WHERE 
      id = $(profile_id) 
      AND account_id = $(account_id)
  `;
  const queryArgs = {
    profile_id: profileID,
    account_id: accountID,
  };

  const profile = await db.one<IAccountProfile>(query, queryArgs);

  return profile;
}
