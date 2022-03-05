export type {
  ICalendarNoteInit,
  ICalendarNote,
  ICalendarNoteClient,
  IAccount,
  IAccountClient,
  IAccountInit,
  IEmailConfirmation
} from "#codegen/schema/interfaces";

export interface AccCreds {
  name: string;
  password: string;
  email?: string;
}
