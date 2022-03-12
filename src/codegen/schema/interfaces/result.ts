/**
 * Account on the resource.
 */
export interface Account {
  id: SerialInteger;
  created_at: ISODateTime;
  updated_at?: ISODateTime;
  name: string;
  /**
   * Is not shown to clients.
   */
  password?: string;
  email?: string;
  role: "user";
  /**
   * Is `true` after account confirms its email.
   */
  is_verified: boolean;
  invite_id?: SerialInteger;
}

/**
 * Account representation for client.
 */
export interface AccountClient {
  created_at: ISODateTime;
  updated_at?: ISODateTime;
  name: string;
  email?: string;
  role: "user";
  /**
   * Is `true` after account confirms its email.
   */
  is_verified: boolean;
}

/**
 * Initializer for account.
 */
export interface AccountInit {
  name: string;
  password: string;
  invite?: CodeString;
}

/**
 * Invite for an account.
 */
export interface Invite {
  id: SerialInteger;
  created_at: ISODateTime;
  account_id: SerialInteger;
  expires_at: ISODateTime;
  code: CodeString;
  uses_left: number;
}

/**
 * Invite representation for client.
 */
export interface InviteClient {
  id: SerialInteger;
  created_at: ISODateTime;
  expires_at: ISODateTime;
  code: CodeString;
  uses_left: number;
}

/**
 * Invite initializer for an account.
 */
export interface InviteInit {
  expires_at: ISODateTime;
  uses_left: number;
}

/**
 * The post of the blog.
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  author?: string;
  created_at: ISODateTime;
  edited_at?: ISODateTime;
  /**
   * The slug of the next article of the series.
   */
  next_slug?: string;
}

/**
 * A note in the calendar.
 */
export interface CalendarNote {
  id: SerialInteger;
  created_at: ISODateTime;
  /**
   * ID of the account making the note.
   */
  account_id?: number;
  date: ISODateTime;
  /**
   * The content of the note.
   */
  note: string;
}

/**
 * A note in the calendar as shown to client.
 */
export interface CalendarNoteClient {
  id: SerialInteger;
  created_at: ISODateTime;
  date: ISODateTime;
  /**
   * The content of the note.
   */
  note: string;
}

/**
 * Init for the note in calendar.
 */
export interface CalendarNoteInit {
  date: ISODateTime;
  /**
   * The content of the note.
   */
  note: string;
}

/**
 * Config for the project.
 */
export interface ProjectConfig {
  /**
   * The origin of the site.
   */
  NEXT_PUBLIC_SITE_ORIGIN?: string;
  NEXT_PUBLIC_SITE_NAME?: string;
  NEXT_PUBLIC_REPOSITORY?: string;
  NEXT_PUBLIC_EMAIL_ADDRESS?: string;
  SECRET_KEY?: string;
  DATABASE_HOSTNAME?: string;
  DATABASE_PORT?: number;
  DATABASE_NAME?: string;
  DATABASE_USER?: string;
  DATABASE_PASSWORD?: string;
  /**
   * Full url for migrations script.
   */
  DATABASE_URL?: string;
  /**
   * Required for migrations to work on heroku-deployed DB.
   */
  PGSSLMODE?: string;
  EMAIL_SMTP_HOSTNAME?: string;
  EMAIL_PORT?: number;
  EMAIL_USERNAME?: string;
  EMAIL_PASSWORD?: string;
  /**
   * Require account for everything on the site or not.
   */
  IS_PUBLIC?: boolean;
  /**
   * Require invites for registrations or not.
   */
  IS_INVITE_ONLY?: boolean;
  /**
   * Admin-exclusive invite.
   */
  ADMIN_INVITE_CODE?: string;
}

/**
 * Various database details.
 */
export interface ProjectDatabase {
  /**
   * Migrations.
   */
  pgmigrations?: {
    [k: string]: unknown;
  };
  /**
   * Accounts.
   */
  accounts?: {
    [k: string]: unknown;
  };
  /**
   * Pending email confirmations for accounts.
   */
  email_confirmations?: {
    [k: string]: unknown;
  };
  /**
   * Account notes for calendar.
   */
  calendar_notes?: {
    [k: string]: unknown;
  };
}

/**
 * Confirmation data for email.
 */
export interface EmailConfirmation {
  id: SerialInteger;
  account_id: SerialInteger;
  confirmation_key: string;
  email: string;
  created_at: ISODateTime;
  expires_at: ISODateTime;
}

/**
 * `nanoid` default output basically.
 */
export type CodeString = string;

/**
 * ISO string representing date.
 */
export type ISODate = string;

/**
 * ISO string representing datetime.
 */
export type ISODateTime = string;

/**
 * ISO string representing time.
 */
export type ISOTime = string;

/**
 * A type to validate email strings separately.
 */
export type EmailString = string;

/**
 * Integer equivalent of `SERIAL` type
 */
export type SerialInteger = number;
