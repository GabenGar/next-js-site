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

export async function getProfiles(paginationDB: IPaginationDB) {
  const { offset, limit } = paginationDB;
  const query = `
    SELECT *
    FROM accounts.profiles
    ORDER BY id
    OFFSET $(offset)
    LIMIT $(limit)
  `;
  const query_args = {
    offset,
    limit,
  };

  const result = await db.task(async (tx) => {
    const profileCount = await countTable({
      ctx: tx,
      schema: "accounts",
      table: "profiles",
    });
    const profiles = await tx.manyOrNone<IAccountProfile>(query, query_args);
    const pagination = toPagination(paginationDB, profileCount);

    return {
      pagination,
      profiles,
    };
  });

  return result;
}

export async function addProfileAvatar(
  account_id: ISerialInteger,
  avatarURL: string
) {}
