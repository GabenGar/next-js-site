import { createValidator } from "#lib/json/schema";

import {
  accountSchema,
  accountClientSchema,
  accountInitSchema,
  inviteSchema,
  inviteInitSchema,
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

import type {
  IAccount,
  IAccountClient,
  IAccountInit,
  IInvite,
  IInviteInit,
  IBlogPost,
  ICalendarNote,
  ICalendarNoteClient,
  ICalendarNoteInit,
  IProjectConfig,
  IProjectDatabase,
  IEmailConfirmation,
  IISODate,
  IISODateTime,
  IISOTime,
  IEmailString,
  ISerialInteger,
} from "#codegen/schema/interfaces";

export const validateAccountFields = createValidator<IAccount>(accountSchema);
export const validateAccountClientFields =
  createValidator<IAccountClient>(accountClientSchema);
export const validateAccountInitFields =
  createValidator<IAccountInit>(accountInitSchema);
export const validateInviteFields = createValidator<IInvite>(inviteSchema);
export const validateInviteInitFields =
  createValidator<IInviteInit>(inviteInitSchema);
export const validateBlogPostFields =
  createValidator<IBlogPost>(blogPostSchema);
export const validateCalendarNoteFields =
  createValidator<ICalendarNote>(calendarNoteSchema);
export const validateCalendarNoteClientFields =
  createValidator<ICalendarNoteClient>(calendarNoteClientSchema);
export const validateCalendarNoteInitFields =
  createValidator<ICalendarNoteInit>(calendarNoteInitSchema);
export const validateProjectConfigFields =
  createValidator<IProjectConfig>(projectConfigSchema);
export const validateProjectDatabaseFields = createValidator<IProjectDatabase>(
  projectDatabaseSchema
);
export const validateEmailConfirmationFields =
  createValidator<IEmailConfirmation>(emailConfirmationSchema);
export const validateISODateFields = createValidator<IISODate>(iSODateSchema);
export const validateISODateTimeFields =
  createValidator<IISODateTime>(iSODateTimeSchema);
export const validateISOTimeFields = createValidator<IISOTime>(iSOTimeSchema);
export const validateEmailStringFields =
  createValidator<IEmailString>(emailStringSchema);
export const validateSerialIntegerFields =
  createValidator<ISerialInteger>(serialIntegerSchema);
