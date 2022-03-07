import { createValidator } from "#lib/json/schema";

import type { IAccount } from "#codegen/schema/interfaces";
import type { IAccountClient } from "#codegen/schema/interfaces";
import type { IAccountInit } from "#codegen/schema/interfaces";
import type { IBlogPost } from "#codegen/schema/interfaces";
import type { ICalendarNote } from "#codegen/schema/interfaces";
import type { ICalendarNoteClient } from "#codegen/schema/interfaces";
import type { ICalendarNoteInit } from "#codegen/schema/interfaces";
import type { IProjectConfig } from "#codegen/schema/interfaces";
import type { IProjectDatabase } from "#codegen/schema/interfaces";
import type { IEmailConfirmation } from "#codegen/schema/interfaces";
import type { IISODate } from "#codegen/schema/interfaces";
import type { IISODateTime } from "#codegen/schema/interfaces";
import type { IISOTime } from "#codegen/schema/interfaces";
import type { ISerialInteger } from "#codegen/schema/interfaces";

export const validateAccountFields = createValidator<IAccount>(
  "account/base.schema.json"
);
export const validateAccountClientFields = createValidator<IAccountClient>(
  "account/client.schema.json"
);
export const validateAccountInitFields = createValidator<IAccountInit>(
  "account/init.schema.json"
);
export const validateBlogPostFields = createValidator<IBlogPost>(
  "blog-post.schema.json"
);
export const validateCalendarNoteFields = createValidator<ICalendarNote>(
  "calendar-note/base.schema.json"
);
export const validateCalendarNoteClientFields =
  createValidator<ICalendarNoteClient>("calendar-note/client.schema.json");
export const validateCalendarNoteInitFields =
  createValidator<ICalendarNoteInit>("calendar-note/init.schema.json");
export const validateProjectConfigFields =
  createValidator<IProjectConfig>("config.schema.json");
export const validateProjectDatabaseFields = createValidator<IProjectDatabase>(
  "database.schema.json"
);
export const validateEmailConfirmationFields =
  createValidator<IEmailConfirmation>("email-confirmation.schema.json");
export const validateISODateFields = createValidator<IISODate>(
  "types/dates/iso-date.schema.json"
);
export const validateISODateTimeFields = createValidator<IISODateTime>(
  "types/dates/iso-datetime.schema.json"
);
export const validateISOTimeFields = createValidator<IISOTime>(
  "types/dates/iso-time.schema.json"
);
export const validateSerialIntegerFields = createValidator<ISerialInteger>(
  "types/serial.schema.json"
);
