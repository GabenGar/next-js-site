import type { NextApiRequest } from "next";
import type { IAccount } from "#types/entities";

/**
 * The request which passed auth validation.
 */
export interface ProtectedAPIRequest extends NextApiRequest {
  account: IAccount;
}
