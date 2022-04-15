import { getAccountDetails } from "#lib/account";
import { withSessionRoute } from "#server/requests";

import type { APIResponse } from "#types/api";
import type { IAccountClient } from "#types/entities";

export default withSessionRoute<IAccountClient>(async (req, res) => {
  if (req.method === "POST") {
    const { account_id } = req.session;

    if (!account_id) {
      return res
        .status(401)
        .json({ is_successful: false, errors: ["Not Authorized."] });
    }

    const account = await getAccountDetails(account_id);

    if (!account) {
      const reqDetails = JSON.stringify(req, undefined, 2);
      console.error(
        `Account with ID "${account_id}" doesn't exist.\n`,
        `Request details: "${reqDetails}".`
      );
      req.session.destroy();

      return res.status(500).json({
        is_successful: false,
        errors: ["Unknown Error."],
      });
    }

    const { id, password, ...clientAccount } = account;

    return res.status(200).json({ is_successful: true, data: clientAccount });
  }
});
