export type {
  IAccountLocalization,
  IAdminLocalization,
  IAuthLocalization,
  IBlogLocalization,
  ICommonLocalization,
  IComponentLocalization,
  ILayoutLocalization,
} from "#codegen/schema/interfaces";

export interface LanguagesOverview extends Record<string, number> {}

export const defaultNamespaces = ["layout", "components"] as const;