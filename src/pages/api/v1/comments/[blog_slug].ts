import { OK } from "#environment/constants/http";
import { getBlogComments } from "#lib/account";
import { withSessionRoute } from "#server/requests";

import type { ICommentClient } from "#types/entities";

export default withSessionRoute<ICommentClient[]>(async (req, res) => {
  if (req.method === "GET") {
    const comments = await getBlogComments();

    return res.status(OK).json({ is_successful: true, data: comments });
  }
});
