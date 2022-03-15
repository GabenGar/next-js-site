import { NODE_ENV, IS_INVITE_ONLY_String, IS_PUBLIC_String } from "./vars";

export const IS_DEVELOPMENT = NODE_ENV === "development";
export const IS_BROWSER = typeof window !== "undefined";
export const IS_INVITE_ONLY = Boolean(IS_INVITE_ONLY_String);
export const IS_PUBLIC = Boolean(IS_PUBLIC_String);

console.log(IS_INVITE_ONLY_String, IS_PUBLIC_String, IS_INVITE_ONLY, IS_PUBLIC);
