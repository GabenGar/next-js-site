import path from "path";
import {
  addProfile,
  addProfileAvatar,
  getProfiles as queryProfiles,
  removeProfile,
} from "#database/queries/account/profile";
import { toPaginationDB } from "#lib/pagination";
import { uploadFile } from "#server/storage";

import type { IPaginationInit } from "#lib/pagination";
import type {
  IAccount,
  IAccountProfile,
  IAccountProfileInit,
  IFormFileObject,
} from "./types";

export async function registerProfile(
  account: IAccount,
  profileInit: IAccountProfileInit
) {
  const newProfile = await addProfile(account.id, profileInit);

  if (!profileInit.avatar_file) {
    return newProfile;
  }

  const avatar_url = await uploadAvatar(
    newProfile,
    profileInit.avatar_file,
    profileInit.content as unknown as Buffer
  );

  const freshProfile = await addProfileAvatar(newProfile.id, avatar_url);

  return freshProfile;
}

/**
 * @TODO: file deletion also
 */
export async function deleteProfile(account: IAccount) {
  const deletedProfile = await removeProfile(account.id, account.profile!.id);

  return deletedProfile;
}

export async function getProfiles(paginationInit: IPaginationInit) {
  const paginationDB = toPaginationDB(paginationInit);
  const profiles = await queryProfiles(paginationDB);

  return profiles;
}

async function uploadAvatar(
  profile: IAccountProfile,
  avatar_file: IFormFileObject,
  fileContent: Buffer
) {
  const uploadPath = `/profile/${profile.id}/avatar/${avatar_file.originalFilename}`;
  const avatarURL = await uploadFile(uploadPath, avatar_file, fileContent);
  const urlString = avatarURL.toStorageURL().toString();
  
  return urlString;
}
