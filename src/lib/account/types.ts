import type { IAccount } from "#codegen/schema/interfaces";

export type {
  IAccount,
  IAccountProfile,
  IAccountProfileInit,
  IFormFileObject,
} from "#codegen/schema/interfaces";

export interface IAuthInfo {
  account: IAccount;
}
