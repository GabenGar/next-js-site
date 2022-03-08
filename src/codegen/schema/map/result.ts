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
  emailStringSchema,
  serialIntegerSchema,
} from "#codegen/schema/assets";

export const schemaMap: Record<string, SchemaObject> = {
  "http://example.com/schemas/account/base.schema.json": accountSchema,
  "http://example.com/schemas/account/client.schema.json": accountClientSchema,
  "http://example.com/schemas/account/init.schema.json": accountInitSchema,
  "http://example.com/schemas/blog-post.schema.json": blogPostSchema,
  "http://example.com/schemas/calendar-note/base.schema.json":
    calendarNoteSchema,
  "http://example.com/schemas/calendar-note/client.schema.json":
    calendarNoteClientSchema,
  "http://example.com/schemas/calendar-note/init.schema.json":
    calendarNoteInitSchema,
  "http://example.com/schemas/config.schema.json": projectConfigSchema,
  "http://example.com/schemas/database.schema.json": projectDatabaseSchema,
  "http://example.com/schemas/email-confirmation.schema.json":
    emailConfirmationSchema,
  "http://example.com/schemas/types/dates/iso-date.schema.json": iSODateSchema,
  "http://example.com/schemas/types/dates/iso-datetime.schema.json":
    iSODateTimeSchema,
  "http://example.com/schemas/types/dates/iso-time.schema.json": iSOTimeSchema,
  "http://example.com/schemas/types/email.schema.json": emailStringSchema,
  "http://example.com/schemas/types/serial.schema.json": serialIntegerSchema,
};
