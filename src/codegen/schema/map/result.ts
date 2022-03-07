import { SchemaObject } from "ajv";

import account from "#schema/assets/account/base.schema.json";
import accountClient from "#schema/assets/account/client.schema.json";
import accountInit from "#schema/assets/account/init.schema.json";
import blogPost from "#schema/assets/blog-post.schema.json";
import calendarNote from "#schema/assets/calendar-note/base.schema.json";
import calendarNoteClient from "#schema/assets/calendar-note/client.schema.json";
import calendarNoteInit from "#schema/assets/calendar-note/init.schema.json";
import projectConfig from "#schema/assets/config.schema.json";
import projectDatabase from "#schema/assets/database.schema.json";
import emailConfirmation from "#schema/assets/email-confirmation.schema.json";
import iSODate from "#schema/assets/types/dates/iso-date.schema.json";
import iSODateTime from "#schema/assets/types/dates/iso-datetime.schema.json";
import iSOTime from "#schema/assets/types/dates/iso-time.schema.json";
import serialInteger from "#schema/assets/types/serial.schema.json";

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
  "types/dates/iso-date.schema.json": iSODate,
  "types/dates/iso-datetime.schema.json": iSODateTime,
  "types/dates/iso-time.schema.json": iSOTime,
  "types/serial.schema.json": serialInteger,
};

export const accountSchema = account;
export const accountClientSchema = accountClient;
export const accountInitSchema = accountInit;
export const blogPostSchema = blogPost;
export const calendarNoteSchema = calendarNote;
export const calendarNoteClientSchema = calendarNoteClient;
export const calendarNoteInitSchema = calendarNoteInit;
export const projectConfigSchema = projectConfig;
export const projectDatabaseSchema = projectDatabase;
export const emailConfirmationSchema = emailConfirmation;
export const iSODateSchema = iSODate;
export const iSODateTimeSchema = iSODateTime;
export const iSOTimeSchema = iSOTime;
export const serialIntegerSchema = serialInteger;
