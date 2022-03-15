import { IISODateTime } from "#codegen/schema/interfaces";
import { getDB } from "#database";

const { db } = getDB();

export async function addInvite(
  accountID: number,
  code: string,
  expiresAt?: IISODateTime,
  maxUses?: number
) {
  const query = `
    INSERT INTO invites 
      (account_id, code, expires_at, max_uses)
    VALUES ($(account_id), $(code), $(expires_at), $(max_uses))
    RETURNING *
  `;
  const newInvite = await db.one(query, {
    account_id: accountID,
    code: code,
    expires_at: expiresAt,
    max_uses: maxUses,
  });

  return newInvite;
}

export async function deactiaveInvite(accountID: number, inviteID: number) {
  const query = `
    UPDATE invites
    SET is_active = false
    WHERE 
      id = $(invite_id)
      AND account_id = $(accountID)
    RETURNING *
  `;
  const deactivatedInvite = await db.one(query, {
    account_id: accountID,
    invite_id: inviteID,
  });

  return deactivatedInvite;
}
