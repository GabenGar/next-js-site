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
  role: "user" | "administrator";
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
  role: "user" | "administrator";
  /**
   * Is `true` after account confirms its email.
   */
  is_verified: boolean;
}

/**
 * Comment by the account
 */
export interface Comment {
  id: SerialInteger;
  created_at: ISODateTime;
  account_id: SerialInteger;
  parent_id?: SerialInteger;
  blog_slug?: string;
  /**
   * Markdown
   */
  content: string;
  is_public: boolean;
}

/**
 * Comment by an account for client
 */
export interface CommentClient {
  id: SerialInteger;
  created_at: ISODateTime;
  parent_id?: SerialInteger;
  blog_slug?: string;
  /**
   * Markdown
   */
  content: string;
  /**
   * Client can only see its own non-public comments.
   */
  is_public: boolean;
}

/**
 * Comment initializer
 */
export interface CommentInit {
  blog_slug?: string;
  /**
   * Markdown
   */
  content: string;
  parent_id?: SerialInteger;
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
  code: CodeString;
  expires_at?: ISODateTime;
  max_uses?: number;
  is_active: boolean;
}

/**
 * Invite representation for client.
 */
export interface InviteClient {
  id: SerialInteger;
  created_at: ISODateTime;
  code: CodeString;
  expires_at?: ISODateTime;
  max_uses?: number;
  is_active: boolean;
}

/**
 * Invite initializer for an account.
 */
export interface InviteInit {
  expires_at?: ISODateTime | null;
  max_uses?: number | null;
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
   * Add it explicitly for `ts-node`
   */
  NODE_ENV?: string;
  /**
   * The origin of the site.
   */
  NEXT_PUBLIC_SITE_ORIGIN?: string;
  NEXT_PUBLIC_SITE_NAME?: string;
  NEXT_PUBLIC_REPOSITORY?: string;
  NEXT_PUBLIC_EMAIL_ADDRESS?: string;
  /**
   * Require account for everything on the site or not.
   */
  NEXT_PUBLIC_IS_PUBLIC?: boolean;
  /**
   * Require invites for registrations or not.
   */
  NEXT_PUBLIC_IS_INVITE_ONLY?: boolean;
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
   * Admin-exclusive invite.
   */
  ADMIN_INVITE_CODE?: string;
}

/**
 * Table of the schema.
 */
export type Table = string;

/**
 * Various database details.
 */
export interface ProjectDatabase {
  /**
   * Default schema used for schema-less table calls.
   */
  default_schema: string;
  schemas: Schemas;
}
/**
 * Database schemas.
 */
export interface Schemas {
  public: Schema;
  comments: Schema;
}
/**
 * Database schema.
 */
export interface Schema {
  /**
   * Description of the schema.
   */
  description: string;
  /**
   * Keys are table names and values are their descriptions.
   */
  tables: {
    [k: string]: Table;
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
 * Comment specific to the frontend mentor challenge.
 */
export interface FMComment {
  id: SerialInteger;
  created_at: ISODateTime;
  parent_id?: SerialInteger;
  /**
   * Markdown
   */
  content: string;
  likes?: number;
  dislikes?: number;
  avatar_url?: string;
}

/**
 * Localization for the account pages.
 */
export interface AccountLocalization {
  [k: string]: unknown;
}

/**
 * Localization for the admin pages.
 */
export interface AdminLocalization {
  [k: string]: unknown;
}

/**
 * Localization for the auth pages.
 */
export interface AuthLocalization {
  [k: string]: unknown;
}

/**
 * Localization for the blog pages.
 */
export interface BlogLocalization {
  [k: string]: unknown;
}

/**
 * Localization for the common pages.
 */
export interface CommonLocalization {
  [k: string]: unknown;
}

/**
 * Localization for the components.
 */
export interface ComponentLocalization {
  [k: string]: unknown;
}

/**
 * Localization for the layout.
 */
export interface LayoutLocalization {
  [k: string]: unknown;
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
