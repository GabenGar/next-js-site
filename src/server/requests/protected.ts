import {
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
} from "#environment/constants/http";
import { getAccountDetails } from "#lib/account";
import { withSessionRoute } from "./session";

import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { APIResponse } from "#types/api";
import type { ProtectedAPIRequest } from "./types";

/**
 * The route which requires an account.
 * TODO: also pass account details to resulting callback.
 */
export function protectedRoute<Res>(handler: NextApiHandler<APIResponse<Res>>) {
  return async (
    req: ProtectedAPIRequest,
    res: NextApiResponse<APIResponse<Res>>
  ) => {
    const { account_id } = req.session;

    if (!account_id) {
      return res
        .status(UNAUTHORIZED)
        .json({ is_succesfull: false, errors: ["Not Authorized."] });
    }

    const account = await getAccountDetails(account_id);

    if (!account) {
      const reqDetails = JSON.stringify(req, undefined, 2);
      console.error(
        `Account with ID "${account_id}" doesn't exist.\n`,
        `Request details: "${reqDetails}".`
      );
      req.session.destroy();

      return res.status(INTERNAL_SERVER_ERROR).json({
        is_succesfull: false,
        errors: ["Unknown Error."],
      });
    }

    req.account = account;

    return withSessionRoute(handler);
  };
}
