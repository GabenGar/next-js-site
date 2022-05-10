import {
  addProfile,
  getProfiles as queryProfiles,
} from "#database/queries/account/profile";
import { toPaginationDB } from "#lib/pagination";


import type { IAccount, IAccountProfileInit } from "#types/entities";
import type { IPaginationInit } from "#lib/pagination";

export async function createProfile(
  account: IAccount,
  profileInit: IAccountProfileInit
) {
  const newProfile = await addProfile(profileInit, account.id);

  return newProfile;
}

export async function getProfiles(paginationInit: IPaginationInit) {

  const paginationDB = toPaginationDB(paginationInit);
  const profiles = await queryProfiles(paginationDB);

  return profiles;
}
