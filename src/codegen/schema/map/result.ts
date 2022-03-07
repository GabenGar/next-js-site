import { SchemaObject } from "ajv";

import {
  accountSchema,
  accountClientSchema,
  accountInitSchema,
  blogPostSchema,
  calendarNoteSchema,
  calendarNoteClientSchema,
  calendarNoteInitSchema,
  projectConfigSchema,
  projectDatabaseSchema,
  emailConfirmationSchema,
  iSODateSchema,
  iSODateTimeSchema,
  iSOTimeSchema,
  serialIntegerSchema,
} from "#codegen/schema/assets";

export const schemaMap: Record<string, SchemaObject> = {
  "account/base.schema.json": accountSchema,
  "account/client.schema.json": accountClientSchema,
  "account/init.schema.json": accountInitSchema,
  "blog-post.schema.json": blogPostSchema,
  "calendar-note/base.schema.json": calendarNoteSchema,
  "calendar-note/client.schema.json": calendarNoteClientSchema,
  "calendar-note/init.schema.json": calendarNoteInitSchema,
  "config.schema.json": projectConfigSchema,
  "database.schema.json": projectDatabaseSchema,
  "email-confirmation.schema.json": emailConfirmationSchema,
  "types/dates/iso-date.schema.json": iSODateSchema,
  "types/dates/iso-datetime.schema.json": iSODateTimeSchema,
  "types/dates/iso-time.schema.json": iSOTimeSchema,
  "types/serial.schema.json": serialIntegerSchema,
};
