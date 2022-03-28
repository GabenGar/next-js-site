import { SchemaObject } from "ajv";

import {
  accountSchema,
  accountClientSchema,
  accountInitSchema,
  inviteSchema,
  inviteClientSchema,
  inviteInitSchema,
  blogPostSchema,
  calendarNoteSchema,
  calendarNoteClientSchema,
  calendarNoteInitSchema,
  projectConfigSchema,
  projectDatabaseSchema,
  emailConfirmationSchema,
  accountLocalizationSchema,
  authLocalizationSchema,
  blogLocalizationSchema,
  commonLocalizationSchema,
  componentLocalizationSchema,
  codeStringSchema,
  iSODateSchema,
  iSODateTimeSchema,
  iSOTimeSchema,
  emailStringSchema,
  serialIntegerSchema,
} from "#codegen/schema/assets";

export const schemaMap: Record<string, SchemaObject> = {
  "http://schemas.com/account/base.schema.json": accountSchema,
  "http://schemas.com/account/client.schema.json": accountClientSchema,
  "http://schemas.com/account/init.schema.json": accountInitSchema,
  "http://schemas.com/account/invite/base.schema.json": inviteSchema,
  "http://schemas.com/account/invite/client.schema.json": inviteClientSchema,
  "http://schemas.com/account/invite/init.schema.json": inviteInitSchema,
  "http://schemas.com/blog-post.schema.json": blogPostSchema,
  "http://schemas.com/calendar-note/base.schema.json": calendarNoteSchema,
  "http://schemas.com/calendar-note/client.schema.json":
    calendarNoteClientSchema,
  "http://schemas.com/calendar-note/init.schema.json": calendarNoteInitSchema,
  "http://schemas.com/config.schema.json": projectConfigSchema,
  "http://schemas.com/database.schema.json": projectDatabaseSchema,
  "http://schemas.com/email-confirmation.schema.json": emailConfirmationSchema,
  "http://schemas.com/localization/account.schema.json":
    accountLocalizationSchema,
  "http://schemas.com/localization/auth.schema.json": authLocalizationSchema,
  "http://schemas.com/localization/blog.schema.json": blogLocalizationSchema,
  "http://schemas.com/localization/common.schema.json":
    commonLocalizationSchema,
  "http://schemas.com/localization/components.schema.json":
    componentLocalizationSchema,
  "http://schemas.com/types/code.schema.json": codeStringSchema,
  "http://schemas.com/types/dates/iso-date.schema.json": iSODateSchema,
  "http://schemas.com/types/dates/iso-datetime.schema.json": iSODateTimeSchema,
  "http://schemas.com/types/dates/iso-time.schema.json": iSOTimeSchema,
  "http://schemas.com/types/email.schema.json": emailStringSchema,
  "http://schemas.com/types/serial.schema.json": serialIntegerSchema,
};
