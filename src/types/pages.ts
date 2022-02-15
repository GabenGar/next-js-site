/**
 * Props shared across all pages.
 */
export interface BasePageProps extends Record<string, unknown> {
  theme?: string;
  errors?: Record<string, string[]> | Array<string>
}