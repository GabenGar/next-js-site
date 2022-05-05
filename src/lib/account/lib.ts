import { getAccount } from "#database/queries/account";
import { addProfile } from "#database/queries/account/profile";

import type {
  IAccount,
  IAccountClient,
  IAccountProfileInit,
} from "#types/entities";

export async function getAccountDetails(account_id: number) {
  const account = await getAccount(account_id);
  return account;
}

export function toAccountClient(account: IAccount): IAccountClient {
  const { id, password, ...accountClient } = account;

  if (accountClient.profile) {
    const { account_id, ...profileClient } = accountClient.profile;
    // @ts-expect-error typing detail
    accountClient.profile = profileClient;
  }

  return accountClient as IAccountClient;
}

export async function createProfile(
  account: IAccount,
  profileInit: IAccountProfileInit
) {
  const newProfile = await addProfile(profileInit, account.id);

  return newProfile;
}
