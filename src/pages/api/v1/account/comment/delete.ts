import {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from "#environment/constants/http";
import { getAccountDetails, deleteComment } from "#lib/account";
import { withSessionRoute } from "#server/requests";
import { validateSerialIntegerFields } from "#codegen/schema/validations";

import type { APIRequest } from "#types/api";
import type { ICommentClient, ISerialInteger } from "#types/entities";

interface RequestBody extends APIRequest<ISerialInteger> {}

export default withSessionRoute<ICommentClient>(async (req, res) => {
  if (req.method === "POST") {
    const { account_id } = req.session;

    if (!account_id) {
      return res
        .status(UNAUTHORIZED)
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

      return res.status(INTERNAL_SERVER_ERROR).json({
        is_successful: false,
        errors: ["Unknown Error."],
      });
    }

    const isBodyPresent = "data" in req.body;

    if (!isBodyPresent) {
      return res.status(UNPROCESSABLE_ENTITY).json({
        is_successful: false,
        errors: ["Invalid body."],
      });
    }

    const result = await validateSerialIntegerFields(
      (req.body as RequestBody).data
    );

    if (!result.is_successful) {
      const errors = result.errors.map((error) => JSON.stringify(error));
      return res.status(UNPROCESSABLE_ENTITY).json({
        is_successful: false,
        errors: errors,
      });
    }

    const { data: commentID } = result;
    const { account_id: accID, ...deletedComment } = await deleteComment(
      account_id,
      commentID
    );

    return res.status(OK).json({ is_successful: true, data: deletedComment });
  }
});
