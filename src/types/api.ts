export interface APIRequest<D = undefined> {
  data: D;
}

export type APIResponse<D = undefined> =
  | APIResponseSuccess<D>
  | APIResponseFailure;

export interface APIResponseSuccess<D = undefined> {
  is_succesfull: true;
  data: D;
}

export interface APIResponseFailure {
  is_succesfull: false;
  errors: string[];
}
