import { NODE_ENV } from "./vars";

export const IS_DEVELOPMENT = NODE_ENV === "development";
export const IS_BROWSER = typeof window !== "undefined";
