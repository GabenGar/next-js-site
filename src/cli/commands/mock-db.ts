import faker from "@faker-js/faker/locale/en";
import { nanoid } from "nanoid";
import { ADMIN_INVITE_CODE } from "#environment/vars";
import {
  registerAccount,
  validateAccountInitFields,
  registerProfile,
} from "#lib/account";
import { createInvite } from "#lib/account/admin";
import { createRange } from "#lib/util";
import { getAdmins } from "#database/queries/account/admin";

import type {
  IAccountInit,
  ISerialInteger,
  IAccount,
  IAccountProfileInit,
} from "#types/entities";
import type { IInvite, IInviteInit } from "#codegen/schema/interfaces";
import { inviteAccount } from "src/lib/account/auth";

export async function mockDB() {
  console.log("Creating admin account.");

  const admins = await getAdmins();
  let admin = admins[0];

  if (!admins.length) {
    const { creds, account } = await createAdmin();
    admin = account;
    console.log(
      [
        "Created admin account",
        `name: ${account.name}`,
        `password: ${creds.password}`,
      ].join("\n")
    );
  } else {
    console.log("Admin account already created, skipping the creation.");
  }

  const invite = await addInvite(admin);
  console.log(`Created an invite with ${invite.max_uses} uses.`);

  const accounts = await registerAccounts(invite);
  console.log(`Registered ${accounts.length} accounts.`);

  const profiles = await createProfiles(accounts);
  console.log(`Created ${profiles.length} account profiles.`);
}

async function createAdmin() {
  const accCreds: IAccountInit = {
    name: "admin-dev",
    password: nanoid(),
    invite: ADMIN_INVITE_CODE,
  };

  await validateAccountInitFields(accCreds);

  const adminAcc = await registerAccount(accCreds);

  return { creds: accCreds, account: adminAcc };
}

async function addInvite(adminAccount: IAccount) {
  const inviteInit: IInviteInit = {
    max_uses: faker.datatype.number({ min: 57, max: 114 }),
  };

  const newInvite = await createInvite(inviteInit, adminAccount);

  return newInvite;
}

async function registerAccounts(invite: IInvite) {
  const accCreds = createRange(invite.max_uses!).map<IAccountInit>(() => {
    return {
      name: faker.name.findName(),
      password: nanoid(),
      invite: invite.code,
    };
  });
  const newAccounts: IAccount[] = [];

  for await (const accCred of accCreds) {
    const newAcc = await inviteAccount(accCred);
    newAccounts.push(newAcc);
  }

  return newAccounts;
}

async function createProfiles(accounts: IAccount[]) {
  const profileInits = accounts.reduce<Map<IAccountProfileInit, IAccount>>(
    (profileInits, account) => {
      const profileInit = { full_name: faker.name.findName() };

      profileInits.set(profileInit, account);

      return profileInits;
    },
    new Map()
  );

  const profiles: IAccountProfileInit[] = [];

  for await (const [profileInit, account] of profileInits) {
    const newProfile = await registerProfile(account, profileInit);

    profiles.push(newProfile);
  }

  return profiles;
}
