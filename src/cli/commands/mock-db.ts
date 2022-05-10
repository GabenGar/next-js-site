import faker from "@faker-js/faker/locale/en";
import { nanoid } from "nanoid";

import type { IAccountInit } from "#types/entities";

export async function mockDB() {}

async function mockAdmin() {
  const accCreds: IAccountInit = {
    name: "admin",
    password: nanoid()
  };
}
