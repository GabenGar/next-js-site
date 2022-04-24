import { OK } from "#environment/constants/http";
import { createComment } from "#lib/account";
import { checkAuth, withSessionRoute, validateBody } from "#server/requests";
import { validateCommentInitFields } from "#codegen/schema/validations";

import type { ICommentClient, ICommentInit } from "#types/entities";

export default withSessionRoute<ICommentClient>(async (req, res) => {
  if (req.method === "POST") {
    const authResult = await checkAuth(req);

    if (!authResult.is_successful) {
      const { json, status } = authResult.response;
      return res.status(status).json(json);
    }

    const account = authResult.account;

    const validationResult = await validateBody<ICommentInit>(
      req.body,
      validateCommentInitFields
    );

    if (!validationResult.is_successful) {
      const { status, errors } = validationResult.response;
      return res.status(status).json({ is_successful: false, errors: errors });
    }

    const commentInit = validationResult.data;

    const { account_id: accID, ...newComment } = await createComment(
      account.id,
      commentInit
    );

    return res.status(OK).json({ is_successful: true, data: newComment });
  }
});
