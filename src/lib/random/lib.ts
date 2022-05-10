import { faker } from "@faker-js/faker";
import { toISODateTime } from "#lib/dates";

import type { IISODateTime } from "#codegen/schema/interfaces";

export function randomSerial() {
  return faker.datatype.number({ min: 1, precision: 1 });
}

export function randomDate(): IISODateTime {
  const to = new Date();
  const from = new Date().setFullYear(to.getFullYear() - 1);
  const date = faker.date.between(from, to);
  return toISODateTime(date);
}

export function randomName() {
  return faker.name.findName()
}