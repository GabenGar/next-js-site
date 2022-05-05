import { addProfile } from "#database/queries/account/profile";

import type {
  IAccount,
  IAccountProfileInit,
} from "#types/entities";

export async function createProfile(
  account: IAccount,
  profileInit: IAccountProfileInit
) {
  const newProfile = await addProfile(profileInit, account.id);

  return newProfile;
}
