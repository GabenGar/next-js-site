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
  profile?: AccountProfile;
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
  profile?: AccountProfileClient;
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
 * The profile of an account.
 */
export interface AccountProfile {
  id: SerialInteger;
  created_at: ISODateTime;
  updated_at: ISODateTime;
  account_id: SerialInteger;
  /**
   * The name shown on the profile card.
   */
  full_name?: string;
  /**
   * The file of the avatar.
   */
  avatar_url?: string;
}

/**
 * The profile of an account used by client.
 */
export interface AccountProfileClient {
  id: SerialInteger;
  created_at: ISODateTime;
  updated_at: ISODateTime;
  /**
   * The name shown on the profile card.
   */
  full_name?: string;
  /**
   * URL of the avatar.
   */
  avatar_url?: string;
}

/**
 * Profile initializer.
 */
export interface AccountProfileInit {
  /**
   * The name shown on the profile card.
   */
  full_name?: string;
  avatar_file?: string;
}

export interface YaDiskDisk {
  /**
   * Признак включенной безлимитной автозагрузки с мобильных устройств.
   */
  unlimited_autoupload_enabled?: boolean;
  /**
   * Максимальный поддерживаемый размер файла.
   */
  max_file_size?: number;
  /**
   * Общий объем диска (байт)
   */
  total_space?: number;
  /**
   * Общий размер файлов в Корзине (байт). Входит в `used_space`.
   */
  trash_size?: number;
  /**
   * Признак наличия купленного места.
   */
  is_paid?: boolean;
  /**
   * Используемый объем диска (байт)
   */
  used_space?: number;
  system_folders?: YaDiskSystemFolders;
  user?: YaDiskUser;
  /**
   * Текущая ревизия Диска
   */
  revision?: number;
}

export interface YaDiskError {
  /**
   * Человекочитаемое описание ошибки
   */
  message: string;
  /**
   * Техническое описание ошибки
   */
  description: string;
  /**
   * Уникальный код ошибки
   */
  error: string;
}

export interface YaDiskSystemFolders {
  /**
   * Путь к папке "Социальные сети/Одноклассники".
   */
  odnoklassniki?: string;
  /**
   * Путь к папке "Социальные сети/Google+".
   */
  google?: string;
  /**
   * Путь к папке "Социальные сети/Instagram".
   */
  instagram?: string;
  /**
   * Путь к папке "Социальные сети/ВКонтакте".
   */
  vkontakte?: string;
  /**
   * Путь к папке "Социальные сети/Мой Мир".
   */
  mailru?: string;
  /**
   * Путь к папке "Загрузки".
   */
  downloads?: string;
  /**
   * Путь к папке "Приложения".
   */
  applications?: string;
  /**
   * Путь к папке "Социальные сети/Facebook".
   */
  facebook?: string;
  /**
   * Путь к папке "Социальные сети".
   */
  social?: string;
  /**
   * Путь к папке "Фотокамера".
   */
  photostream?: string;
  /**
   * Путь к папке "Скриншоты".
   */
  screenshots?: string;
  /**
   * Путь к папке "Сканы".
   */
  scans?: string;
}

export interface YaDiskUser {
  /**
   * Страна
   */
  country?: string;
  /**
   * Логин
   */
  login?: string;
  /**
   * Отображаемое имя
   */
  display_name?: string;
  /**
   * Идентификатор пользователя
   */
  uid?: string;
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
  /**
   * Auth key for Yandex.Disk
   */
  YANDEX_DISK_KEY?: string;
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
  accounts: Schema;
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
  parent_id?: SerialInteger | null;
  name: string;
  /**
   * Markdown
   */
  content: string;
  likes: number;
  dislikes: number;
  avatar_url: string;
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
 * Localization for the FM comments challenge.
 */
export interface FMCommentsLocalization {
  [k: string]: unknown;
}

/**
 * Localization for the frontend mentor pages.
 */
export interface FrontendMentorLocalization {
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
