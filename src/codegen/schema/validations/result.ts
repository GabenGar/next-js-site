import { createValidator } from "#lib/json/schema";

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

import type {
  IAccount,
  IAccountClient,
  IAccountInit,
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

export const validateAccountFields = createValidator<IAccount>(
  accountSchema.$id
);
export const validateAccountClientFields = createValidator<IAccountClient>(
  accountClientSchema.$id
);
export const validateAccountInitFields = createValidator<IAccountInit>(
  accountInitSchema.$id
);
export const validateBlogPostFields = createValidator<IBlogPost>(
  blogPostSchema.$id
);
export const validateCalendarNoteFields = createValidator<ICalendarNote>(
  calendarNoteSchema.$id
);
export const validateCalendarNoteClientFields =
  createValidator<ICalendarNoteClient>(calendarNoteClientSchema.$id);
export const validateCalendarNoteInitFields =
  createValidator<ICalendarNoteInit>(calendarNoteInitSchema.$id);
export const validateProjectConfigFields = createValidator<IProjectConfig>(
  projectConfigSchema.$id
);
export const validateProjectDatabaseFields = createValidator<IProjectDatabase>(
  projectDatabaseSchema.$id
);
export const validateEmailConfirmationFields =
  createValidator<IEmailConfirmation>(emailConfirmationSchema.$id);
export const validateISODateFields = createValidator<IISODate>(
  iSODateSchema.$id
);
export const validateISODateTimeFields = createValidator<IISODateTime>(
  iSODateTimeSchema.$id
);
export const validateISOTimeFields = createValidator<IISOTime>(
  iSOTimeSchema.$id
);
export const validateEmailStringFields = createValidator<IEmailString>(
  emailStringSchema.$id
);
export const validateSerialIntegerFields = createValidator<ISerialInteger>(
  serialIntegerSchema.$id
);
