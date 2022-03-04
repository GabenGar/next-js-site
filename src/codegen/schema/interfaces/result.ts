/**
 * Account on the resource.
 */
export interface Account {
  id: number;
  created_at: string;
  updated_at?: string;
  name: string;
  password?: string;
  email?: string;
  role: "user";
  /**
   * Is `true` after account confirms its email.
   */
  is_verified: boolean;
}


/**
 * Account representation for client.
 */
export interface AccountClient {
  created_at: string;
  updated_at?: string;
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
  created_at: string;
  edited_at?: string;
  /**
   * The slug of the next article of the series.
   */
  next_slug?: string;
}


/**
 * A note in the calendar.
 */
export interface CalendarNote {
  id: number;
  created_at: string;
  /**
   * ID of the account making the note.
   */
  account_id?: number;
  /**
   * The timestamp of the note.
   */
  date: string;
  /**
   * The content of the note.
   */
  note: string;
  additionalProperties?: false;
  [k: string]: unknown;
}


/**
 * Init for the note in calendar.
 */
export interface CalendarNoteInit {
  /**
   * The timestamp of the note.
   */
  date: string;
  /**
   * The content of the note.
   */
  note: string;
  additionalProperties?: false;
  [k: string]: unknown;
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
export interface EmailConfimation {
  id?: number;
  account_id?: number;
  confirmation_key?: string;
  email?: string;
  created_at?: string;
  expires_at?: string;
}


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
