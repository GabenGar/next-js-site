export const formMethods = ["GET", "POST"] as const;

export const FORM_ENC_TYPE = {
  /**
   * The default value.
   */
  DEFAULT: "application/x-www-form-urlencoded",
  /**
   * Use this if the form contains `<input>` elements with `type=file`.
   */
  FILE_UPLOAD: "multipart/form-data",
  /**
   * Introduced by HTML5 for debugging purposes.
   */
  DEBUG: "text/plain",
} as const;

export type IFormMethod = typeof formMethods[number];
export type IFormEncType = typeof FORM_ENC_TYPE[keyof typeof FORM_ENC_TYPE];
