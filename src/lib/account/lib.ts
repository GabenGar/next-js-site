import { getAccount } from "#database/queries/account";

import type { IAccount, IAccountClient } from "#types/entities";

export async function getAccountDetails(account_id: number) {
  const account = await getAccount(account_id);
  return account;
}

export function toAccountClient(account: IAccount): IAccountClient {
  const { id, password, ...accountClient}= account;

  if (accountClient.profile) {
    const { account_id, ...profileClient } = accountClient.profile;
    // @ts-expect-error typing detail
    accountClient.profile = profileClient
  }

  return accountClient as IAccountClient;
}
