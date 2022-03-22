import { nanoid } from "nanoid";
import { getAccounts } from "#database/queries/account/admin";
import { addInvite } from "#database/queries/account/invites";
import { calculatePaginationDB } from "#lib/pagination";

import type { PaginationDB, PaginationInit } from "#lib/pagination";
import type { IInviteInit } from "#codegen/schema/interfaces";
import type { IAccount } from "#types/entities";

export async function getAccountList(pagination: PaginationInit) {
  const paginationDB: PaginationDB = calculatePaginationDB(pagination);
  const accounts = await getAccounts(paginationDB);
  return accounts;
}

/**
 * @TODO expire date validation once it becomes public.
 */
export async function createInvite(inviteInit: IInviteInit, account: IAccount) {
  const inviteCode = nanoid();
  const newInvite = await addInvite(account.id, inviteCode, inviteInit);

  return newInvite;
}
