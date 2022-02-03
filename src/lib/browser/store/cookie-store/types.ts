export interface CookieStore {
  get: () => string | undefined
  set: (value: string) => boolean
}

export interface ParsedCookie extends Map<string, string | undefined> {}
