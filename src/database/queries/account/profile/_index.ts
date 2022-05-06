import { IS_DEVELOPMENT } from "#environment/derived";
import { toPagination } from "#lib/pagination";
import { randomProfiles } from "#lib/random";
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

  if (IS_DEVELOPMENT) {
    const profiles = randomProfiles();
    const pagination = toPagination(paginationDB, profiles.length);

    return {
      pagination,
      profiles: profiles.slice(0, pagination.limit - 1),
    };
  }

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
