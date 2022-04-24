import type { OperationResult } from "./util";

export interface APIRequest<D = undefined> {
  data?: D;
}

export type APIResponse<D = undefined> =
  | APIResponseSuccess<D>
  | APIResponseFailure;

export interface APIResponseSuccess<D = undefined>
  extends OperationResult<true> {
  data: D;
}

export interface APIResponseFailure extends OperationResult<false> {
  errors: string[];
}
