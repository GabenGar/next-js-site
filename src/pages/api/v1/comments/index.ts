import { OK } from "#environment/constants/http";
import { getComments } from "#lib/account";
import { withSessionRoute } from "#server/requests";

import type { ICommentClient } from "#types/entities";

export default withSessionRoute<ICommentClient[]>(async (req, res) => {
  if (req.method === "GET") {
    const comments = await getComments();
    const commentsClient = comments.map<ICommentClient>(
      ({ account_id, ...commentFields }) => {
        return {
          ...commentFields,
        };
      }
    );

    return res.status(OK).json({ is_successful: true, data: commentsClient });
  }
});
