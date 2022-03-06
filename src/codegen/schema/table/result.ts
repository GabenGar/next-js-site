import { SchemaObject } from "ajv";

import account from "#schema/account/base.schema.json";
import accountClient from "#schema/account/client.schema.json";
import accountInit from "#schema/account/init.schema.json";
import blogPost from "#schema/blog-post.schema.json";
import calendarNote from "#schema/calendar-note/base.schema.json";
import calendarNoteClient from "#schema/calendar-note/client.schema.json";
import calendarNoteInit from "#schema/calendar-note/init.schema.json";
import projectConfig from "#schema/config.schema.json";
import projectDatabase from "#schema/database.schema.json";
import emailConfirmation from "#schema/email-confirmation.schema.json";
import metaSchema from "#schema/meta.schema.json";
import iSODate from "#schema/types/dates/iso-date.schema.json";
import iSODateTime from "#schema/types/dates/iso-datetime.schema.json";
import iSOTime from "#schema/types/dates/iso-time.schema.json";
import serialInteger from "#schema/types/serial.schema.json";

export const schemaMap: Record<string, SchemaObject> = {
  "account/base.schema.json": account,
  "account/client.schema.json": accountClient,
  "account/init.schema.json": accountInit,
  "blog-post.schema.json": blogPost,
  "calendar-note/base.schema.json": calendarNote,
  "calendar-note/client.schema.json": calendarNoteClient,
  "calendar-note/init.schema.json": calendarNoteInit,
  "config.schema.json": projectConfig,
  "database.schema.json": projectDatabase,
  "email-confirmation.schema.json": emailConfirmation,
  "meta.schema.json": metaSchema,
  "types/dates/iso-date.schema.json": iSODate,
  "types/dates/iso-datetime.schema.json": iSODateTime,
  "types/dates/iso-time.schema.json": iSOTime,
  "types/serial.schema.json": serialInteger,
};
