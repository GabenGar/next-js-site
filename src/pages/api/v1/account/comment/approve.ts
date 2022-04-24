import { OK, NOT_FOUND } from "#environment/constants/http";
import { approveComment } from "#lib/account";
import { withSessionRoute, checkAuth, validateBody } from "#server/requests";
import { validateSerialIntegerFields } from "#codegen/schema/validations";

import type { IComment, ISerialInteger } from "#types/entities";

export default withSessionRoute<IComment>(async (req, res) => {
  if (req.method === "POST") {
    const authResult = await checkAuth(req);

    if (!authResult.is_successful) {
      const { status, json } = authResult.response;
      return res.status(status).json(json);
    }

    const { account } = authResult;

    // @TODO: approval by non-admin
    if (account.role !== "administrator") {
      return res
        .status(NOT_FOUND)
        .json({ is_successful: false, errors: ["Not Found."] });
    }

    const validationResult = await validateBody<ISerialInteger>(
      req.body,
      validateSerialIntegerFields
    );

    if (!validationResult.is_successful) {
      const { status, errors } = validationResult.response;

      return res.status(status).json({ is_successful: false, errors: errors });
    }

    const commentID = validationResult.data;

    const approvedComment = await approveComment(
      account,
      commentID
    );

    return res.status(OK).json({ is_successful: true, data: approvedComment });
  }
});
