import { ADMIN_INVITE_CODE } from "#environment/vars";
import { IS_INVITE_ONLY } from "#environment/derived";
import {
  addAccount,
  addAdminAccount,
  findAccountByName,
  findAccount,
} from "#database/queries/account";
import {
  addInviteToAccount,
  countInviteUse,
  deactivateInvite,
  findInvite,
} from "#database/queries/account/invites";
import { AuthError } from "#lib/errors";
import { sha3Encryption } from "#lib/encryption";
import { isAfter, nowISO } from "#lib/dates";

import type { IAccountInit } from "#types/entities";

const { encryptString } = sha3Encryption;

export async function registerAccount(accCreds: IAccountInit) {
  const encryptedAccCreds: IAccountInit = {
    ...accCreds,
    password: encryptString(accCreds.password),
  };

  const existingAccount = await findAccountByName(encryptedAccCreds);

  if (existingAccount) {
    throw new AuthError("Account with this name already exists.");
  }

  if (encryptedAccCreds.invite === ADMIN_INVITE_CODE) {
    const adminAccount = await addAdminAccount(encryptedAccCreds);

    return adminAccount;
  }

  if (IS_INVITE_ONLY) {
    const result = await inviteAccount(encryptedAccCreds);

    return result;
  }

  const account = await addAccount(
    encryptedAccCreds.name,
    encryptedAccCreds.password
  );

  return account;
}

/**
 * The invite is assumed to be present.
 */
export async function inviteAccount(encryptedAccCreds: IAccountInit) {
  const invite = await findInvite(encryptedAccCreds.invite!);

  if (!invite) {
    throw new AuthError("Invite with this code doesn't exist.");
  }

  if (!invite.is_active) {
    throw new AuthError("Invite with this code is disabled.");
  }

  if (invite.expires_at && isAfter(nowISO(), invite.expires_at)) {
    await deactivateInvite(invite.id);
    throw new AuthError("Invite with this code has expired.");
  }

  if (invite.max_uses) {
    const inviteCount = await countInviteUse(invite.id);

    if (inviteCount >= invite.max_uses) {
      await deactivateInvite(invite.id);
      throw new AuthError("Invite with this code is out of uses.");
    }
  }

  const account = await addAccount(
    encryptedAccCreds.name,
    encryptedAccCreds.password
  );

  const invitedAccount = await addInviteToAccount(account.id, invite.id);

  return invitedAccount;
}

export async function loginAccount(accCreds: IAccountInit) {
  const encryptedAccCreds: IAccountInit = {
    ...accCreds,
    password: encryptString(accCreds.password),
  };

  const account = await findAccount(encryptedAccCreds);

  if (!account) {
    return new AuthError("Account with these credentials doesn't exist.");
  }

  return account;
}
