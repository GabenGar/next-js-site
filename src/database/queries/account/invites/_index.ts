import { getDB } from "#database";

import type { IAccount } from "#types/entities";
import type {
  IInvite,
  IInviteInit
} from "#codegen/schema/interfaces";

const { db } = getDB();

export async function addInvite(
  accountID: number,
  code: string,
  { expires_at, max_uses }: IInviteInit
) {
  const query = `
    INSERT INTO accounts.invites
      (account_id, code, expires_at, max_uses)
    VALUES ($(account_id), $(code), $(expires_at), $(max_uses))
    RETURNING *
  `;
  const newInvite = await db.one<IInvite>(query, {
    account_id: accountID,
    code: code,
    expires_at: expires_at,
    max_uses: max_uses,
  });

  return newInvite;
}

export async function findInvite(code: string) {
  const query = `
    SELECT *
    FROM accounts.invites
    WHERE code = $(code)
  `;
  const invite = db.oneOrNone<IInvite>(query, { code: code });
  return invite;
}

export async function countInviteUse(inviteID: number) {
  const query = `
    SELECT COUNT(*) as invite_count
    FROM accounts.entries
    WHERE invite_id = $(invite_id)
  `;

  const inviteCount = await db.one<{ invite_count: number }>(query, {
    invite_id: inviteID,
  });
  return inviteCount.invite_count;
}

export async function deactivateInvite(inviteID: number) {
  const query = `
    UPDATE accounts.invites
    SET is_active = false
    WHERE
      id = $(invite_id)
    RETURNING *
  `;
  const deactivatedInvite = await db.one<IInvite>(query, {
    invite_id: inviteID,
  });

  return deactivatedInvite;
}

export async function addInviteToAccount(accountID: number, inviteID: number) {
  const query = `
    UPDATE accounts.entries
    SET invite_id = $(invite_id)
    WHERE id = $(account_id)
    RETURNING *
  `;

  const invitedAccount = await db.one<IAccount>(query, {
    account_id: accountID,
    invite_id: inviteID,
  });

  return invitedAccount;
}
