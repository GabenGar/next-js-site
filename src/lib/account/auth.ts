import { ADMIN_INVITE_CODE } from "#environment/vars";
import { IS_INVITE_ONLY } from "#environment/derived";
import {
  addAccount,
  addAdminAccount,
  findAccountByName,
  findAccount,
} from "#database/queries/account";
import { AuthError } from "#types/errors";
import { sha3Encryption } from "#lib/encryption";

import type { IAccountInit } from "#types/entities";

const { encryptString } = sha3Encryption;

export async function registerAccount(accCreds: IAccountInit) {
  const encryptedAccCreds: IAccountInit = {
    ...accCreds,
    password: encryptString(accCreds.password),
  };

  const existingAccount = await findAccountByName(encryptedAccCreds);

  if (existingAccount) {
    return new AuthError("Account with this name already exists.");
  }

  if (encryptedAccCreds.invite === ADMIN_INVITE_CODE) {
    const adminAccount = await addAdminAccount(encryptedAccCreds);

    return adminAccount;
  }

  if (IS_INVITE_ONLY) {
    
  }

  const account = await addAccount(
    encryptedAccCreds.name,
    encryptedAccCreds.password
  );

  return account;
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
