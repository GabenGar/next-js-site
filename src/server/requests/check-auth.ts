import {
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
} from "#environment/constants/http";
import { getAccountDetails } from "#lib/account";

import type { NextApiRequest, NextApiResponse } from "next";
import type { APIResponseFailure } from "#types/api";
import type { IAccount } from "#types/entities";
import { OperationResult } from "#types/util";

export type AuthResult = AuthSuccess | AuthFailure;
export interface AuthSuccess extends OperationResult<true> {
  account: IAccount;
}

export interface AuthFailure extends OperationResult<false> {
  response: NextApiResponse<APIResponseFailure>;
}

export async function checkAuth(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseFailure>
): Promise<AuthResult> {
  const { account_id } = req.session;

  if (!account_id) {
    res.status(UNAUTHORIZED);
    res.json({ is_successful: false, errors: ["Not Authorized."] });

    return {
      is_successful: false,
      response: res,
    };
  }

  const account = await getAccountDetails(account_id);

  if (!account) {
    const reqDetails = JSON.stringify(req, undefined, 2);
    console.error(
      `Account with ID "${account_id}" doesn't exist.\n`,
      `Request details: "${reqDetails}".`
    );
    req.session.destroy();
    res.status(INTERNAL_SERVER_ERROR);
    res.json({
      is_successful: false,
      errors: ["Unknown Error."],
    });

    return {
      is_successful: false,
      response: res,
    };
  }

  return {
    is_successful: true,
    account: account,
  };
}
