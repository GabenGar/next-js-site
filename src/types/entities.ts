import type { DateLike } from "#lib/dates";

export interface Account {
  id?: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  password?: string;
  email?: string;
  role?: string;
}

export interface AccountClient extends Omit<Account, "id" | "password"> {}

export interface AccCreds {
  name: string;
  password: string;
  email?: string;
}

export interface EmailConfirmation {
  id: number;
  account_id: number;
  email: string;
  confirmation_key: string;
  created_at: string;
  expires_at: string;
}

export interface ICalendarNote {
  id: number;
  created_at: DateLike;
  date: DateLike;
  note: string;
  account_id?: number;
}

export interface ICalendarNoteInit
  extends Omit<ICalendarNote, "id" | "created_at" | "account_id"> {}

export interface ICalendarNotePublic
  extends Omit<ICalendarNote, "account_id"> {}
