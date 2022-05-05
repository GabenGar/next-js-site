import type { IPaginationInit, IPagination } from "#lib/pagination";
import type { OperationResult } from "./util";

export interface APIRequest<D = undefined> {
  pagination?: IPaginationInit;
  data?: D;
}

export type APIResponse<D = undefined> =
  | APIResponseSuccess<D>
  | APIResponseFailure;

export interface APIResponseSuccess<D = undefined>
  extends OperationResult<true> {
  pagination?: IPagination;
  data: D;
}

export interface APIResponseFailure extends OperationResult<false> {
  errors: string[];
}
