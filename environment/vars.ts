import { config } from "dotenv";
import path from "path";
import { PROJECT_ROOT } from "#environment/constants";

config({
  path: path.join(PROJECT_ROOT, ".env.local"),
});

export const NODE_ENV = process.env.NODE_ENV!;
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME!;
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN!;
export const REPOSITORY = process.env.NEXT_PUBLIC_REPOSITORY!;
export const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL_ADDRESS!;
export const IS_PUBLIC_String = process.env.NEXT_PUBLIC_IS_PUBLIC!;
export const IS_INVITE_ONLY_String = process.env.NEXT_PUBLIC_IS_INVITE_ONLY!;
export const DATABASE_HOSTNAME = process.env.DATABASE_HOSTNAME!;
export const DATABASE_PORT = process.env.DATABASE_PORT!;
export const DATABASE_NAME = process.env.DATABASE_NAME!;
export const DATABASE_USER = process.env.DATABASE_USER!;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD!;
export const DATABASE_URL = process.env.DATABASE_URL!;
export const SECRET_KEY = process.env.SECRET_KEY!;
export const EMAIL_SMTP_HOSTNAME = process.env.EMAIL_SMTP_HOSTNAME!;
export const EMAIL_PORT = process.env.EMAIL_PORT!;
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME!;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD!;
export const ADMIN_INVITE_CODE = process.env.ADMIN_INVITE_CODE!;
