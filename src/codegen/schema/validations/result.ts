import { createValidator } from "#lib/json/schema";

import type { IAccount } from "#codegen/schema/interfaces";
export const validateAccountFields = createValidator<IAccount>({
  $id: "account/base.schema.json",
  title: "Account",
  description: "Account on the resource.",
  type: "object",
  required: ["id", "created_at", "name", "role", "is_verified"],
  properties: {
    id: {
      $ref: "types/serial.schema.json",
    },
    created_at: {
      $ref: "types/dates/iso-datetime.schema.json",
    },
    updated_at: {
      $ref: "types/dates/iso-datetime.schema.json",
    },
    name: {
      type: "string",
      minLength: 5,
      maxLength: 15,
    },
    password: {
      type: "string",
      description: "Is not shown to clients.",
      minLength: 8,
      maxLength: 256,
    },
    email: {
      type: "string",
      format: "email",
      maxLength: 512,
    },
    role: {
      type: "string",
      enum: ["user"],
    },
    is_verified: {
      type: "boolean",
      default: false,
      description: "Is `true` after account confirms its email.",
    },
  },
  additionalProperties: false,
});

import type { IAccountClient } from "#codegen/schema/interfaces";
export const validateAccountClientFields = createValidator<IAccountClient>({
  $id: "account/client.schema.json",
  title: "AccountClient",
  description: "Account representation for client.",
  type: "object",
  required: ["created_at", "name", "role", "is_verified"],
  properties: {
    created_at: {
      $ref: "types/dates/iso-datetime.schema.json",
    },
    updated_at: {
      $ref: "types/dates/iso-datetime.schema.json",
    },
    name: {
      type: "string",
      minLength: 5,
      maxLength: 15,
    },
    email: {
      type: "string",
      format: "email",
      maxLength: 512,
    },
    role: {
      type: "string",
      enum: ["user"],
    },
    is_verified: {
      type: "boolean",
      default: false,
      description: "Is `true` after account confirms its email.",
    },
  },
  additionalProperties: false,
});

import type { IAccountInit } from "#codegen/schema/interfaces";
export const validateAccountInitFields = createValidator<IAccountInit>({
  $id: "account/init.schema.json",
  title: "AccountInit",
  description: "Initializer for account.",
  type: "object",
  required: ["name", "password"],
  properties: {
    name: {
      type: "string",
      minLength: 5,
      maxLength: 15,
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 256,
    },
  },
  additionalProperties: false,
});

import type { IBlogPost } from "#codegen/schema/interfaces";
export const validateBlogPostFields = createValidator<IBlogPost>({
  $id: "blog-post.schema.json",
  title: "BlogPost",
  description: "The post of the blog.",
  type: "object",
  required: ["slug", "title", "created_at", "content"],
  properties: {
    slug: {
      type: "string",
    },
    title: {
      type: "string",
    },
    excerpt: {
      type: "string",
    },
    content: {
      type: "string",
    },
    author: {
      type: "string",
    },
    created_at: {
      $ref: "types/dates/iso-datetime.schema.json",
    },
    edited_at: {
      $ref: "types/dates/iso-datetime.schema.json",
    },
    next_slug: {
      type: "string",
      description: "The slug of the next article of the series.",
    },
  },
  additionalProperties: false,
});

import type { ICalendarNote } from "#codegen/schema/interfaces";
export const validateCalendarNoteFields = createValidator<ICalendarNote>({
  $id: "calendar-note/base.schema.json",
  title: "CalendarNote",
  description: "A note in the calendar.",
  type: "object",
  required: ["id", "created_at", "date", "note"],
  properties: {
    id: {
      $ref: "types/serial.schema.json",
    },
    created_at: {
      $ref: "types/dates/iso-datetime.schema.json",
    },
    account_id: {
      type: "integer",
      description: "ID of the account making the note.",
    },
    date: {
      $ref: "types/dates/iso-datetime.schema.json",
    },
    note: {
      type: "string",
      description: "The content of the note.",
      minLength: 5,
      maxLength: 1024,
    },
  },
  additionalProperties: false,
});

import type { ICalendarNoteClient } from "#codegen/schema/interfaces";
export const validateCalendarNoteClientFields =
  createValidator<ICalendarNoteClient>({
    $id: "calendar-note/client.schema.json",
    title: "CalendarNoteClient",
    description: "A note in the calendar as shown to client.",
    type: "object",
    required: ["id", "created_at", "date", "note"],
    properties: {
      id: {
        $ref: "types/serial.schema.json",
      },
      created_at: {
        $ref: "types/dates/iso-datetime.schema.json",
      },
      date: {
        $ref: "types/dates/iso-datetime.schema.json",
      },
      note: {
        type: "string",
        description: "The content of the note.",
        minLength: 5,
        maxLength: 1024,
      },
    },
    additionalProperties: false,
  });

import type { ICalendarNoteInit } from "#codegen/schema/interfaces";
export const validateCalendarNoteInitFields =
  createValidator<ICalendarNoteInit>({
    $id: "calendar-note/init.schema.json",
    title: "CalendarNoteInit",
    description: "Init for the note in calendar.",
    type: "object",
    required: ["date", "note"],
    properties: {
      date: {
        $ref: "types/dates/iso-datetime.schema.json",
      },
      note: {
        type: "string",
        description: "The content of the note.",
        minLength: 5,
        maxLength: 1024,
      },
    },
    additionalProperties: false,
  });

import type { IProjectConfig } from "#codegen/schema/interfaces";
export const validateProjectConfigFields = createValidator<IProjectConfig>({
  $id: "config.schema.json",
  title: "ProjectConfig",
  description: "Config for the project.",
  type: "object",
  properties: {
    NEXT_PUBLIC_SITE_ORIGIN: {
      type: "string",
      format: "uri",
      default: "http://localhost:3000",
      description: "The origin of the site.",
    },
    NEXT_PUBLIC_SITE_NAME: {
      type: "string",
      default: "Localhost",
    },
    NEXT_PUBLIC_REPOSITORY: {
      type: "string",
      format: "uri",
      default: "https://github.com/GabenGar/next-js-site",
    },
    NEXT_PUBLIC_EMAIL_ADDRESS: {
      type: "string",
      format: "email",
      default: "FLYING POLAR BUFFALO ERROR",
    },
    SECRET_KEY: {
      type: "string",
      default: "FLYING POLAR BUFFALO ERROR",
    },
    DATABASE_HOSTNAME: {
      type: "string",
      default: "localhost",
    },
    DATABASE_PORT: {
      type: "integer",
      default: 5432,
    },
    DATABASE_NAME: {
      type: "string",
      default: "FLYING POLAR BUFFALLO ERROR",
    },
    DATABASE_USER: {
      type: "string",
      default: "FLYING POLAR BUFFALLO ERROR",
    },
    DATABASE_PASSWORD: {
      type: "string",
      default: "FLYING POLAR BUFFALLO ERROR",
    },
    DATABASE_URL: {
      type: "string",
      default: "FLYING POLAR BUFFALLO ERROR",
      description: "Full url for migrations script.",
    },
    PGSSLMODE: {
      type: "string",
      default: "no-verify",
      description: "Required for migrations to work on heroku-deployed DB.",
    },
    EMAIL_SMTP_HOSTNAME: {
      type: "string",
      default: "FLYING POLAR BUFFALO ERROR",
    },
    EMAIL_PORT: {
      type: "integer",
      default: 465,
    },
    EMAIL_USERNAME: {
      type: "string",
      default: "FLYING POLAR BUFFALO ERROR",
    },
    EMAIL_PASSWORD: {
      type: "string",
      default: "FLYING POLAR BUFFALO ERROR",
    },
  },
  additionalProperties: false,
});

import type { IProjectDatabase } from "#codegen/schema/interfaces";
export const validateProjectDatabaseFields = createValidator<IProjectDatabase>({
  $id: "database.schema.json",
  title: "ProjectDatabase",
  description: "Various database details.",
  type: "object",
  properties: {
    pgmigrations: {
      type: "object",
      description: "Migrations.",
    },
    accounts: {
      type: "object",
      description: "Accounts.",
    },
    email_confirmations: {
      type: "object",
      description: "Pending email confirmations for accounts.",
    },
    calendar_notes: {
      type: "object",
      description: "Account notes for calendar.",
    },
  },
  additionalProperties: false,
});

import type { IEmailConfirmation } from "#codegen/schema/interfaces";
export const validateEmailConfirmationFields =
  createValidator<IEmailConfirmation>({
    $id: "email-confirmation.schema.json",
    title: "EmailConfirmation",
    description: "Confirmation data for email.",
    type: "object",
    required: [
      "id",
      "account_id",
      "confirmation_key",
      "email",
      "created_at",
      "expires_at",
    ],
    properties: {
      id: {
        $ref: "types/serial.schema.json",
      },
      account_id: {
        $ref: "types/serial.schema.json",
      },
      confirmation_key: {
        type: "string",
      },
      email: {
        type: "string",
        format: "email",
      },
      created_at: {
        $ref: "types/dates/iso-datetime.schema.json",
      },
      expires_at: {
        $ref: "types/dates/iso-datetime.schema.json",
      },
    },
    additionalProperties: false,
  });

import type { IISODate } from "#codegen/schema/interfaces";
export const validateISODateFields = createValidator<IISODate>({
  $id: "types/dates/iso-date.schema.json",
  title: "ISODate",
  description: "ISO string representing date.",
  type: "string",
  format: "date",
});

import type { IISODateTime } from "#codegen/schema/interfaces";
export const validateISODateTimeFields = createValidator<IISODateTime>({
  $id: "types/dates/iso-datetime.schema.json",
  title: "ISODateTime",
  description: "ISO string representing datetime.",
  type: "string",
  format: "date-time",
  minLength: 5,
  maxLength: 128,
});

import type { IISOTime } from "#codegen/schema/interfaces";
export const validateISOTimeFields = createValidator<IISOTime>({
  $id: "types/dates/iso-time.schema.json",
  title: "ISOTime",
  description: "ISO string representing time.",
  type: "string",
  format: "time",
});

import type { ISerialInteger } from "#codegen/schema/interfaces";
export const validateSerialIntegerFields = createValidator<ISerialInteger>({
  $id: "types/serial.schema.json",
  title: "SerialInteger",
  description: "Integer equivalent of `SERIAL` type",
  type: "integer",
  minimum: 1,
});
