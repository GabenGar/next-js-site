import { createRange } from "#lib/util";
import { randomDate, randomName, randomSerial } from "./lib";

import type { IAccountProfile } from "#types/entities";

function randomProfile(): IAccountProfile {
  const profile: IAccountProfile = {
    account_id: randomSerial(),
    id: randomSerial(),
    full_name: randomName(),
    created_at: randomDate(),
    updated_at: randomDate(),
  };

  return profile;
}

export function randomProfiles() {
  const range = createRange(1024);
  const profiles = range.map(() => randomProfile());
  return profiles;
}
