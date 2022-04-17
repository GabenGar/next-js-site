import { NOT_FOUND } from "#environment/constants/http";
import { withSessionRoute, checkAuth } from "#server/requests";
import { queryPendingComments } from "#database/queries/account/admin";

import type { IComment } from "#types/entities";

export default withSessionRoute<IComment[]>(async (req, res) => {
  if (req.method === "GET") {
    const authResult = await checkAuth(req);

    if (!authResult.is_successful) {
      const { status, json } = authResult.response;
      return res.status(status).json(json);
    }

    const account = authResult.account;

    if (account.role === "administrator") {
      return res.status(NOT_FOUND).json({
        is_successful: false,
        errors: ["Not found"],
      });
    }

    const comments = await queryPendingComments();

    return res.status(200).json({ is_successful: true, data: comments });
  }
});
