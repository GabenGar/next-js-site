import {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from "#environment/constants/http";
import { getAccountDetails, createComment } from "#lib/account";
import { withSessionRoute } from "#server/requests";
import { validateCommentInitFields } from "#codegen/schema/validations";

import type { APIRequest } from "#types/api";
import type { ICommentClient, ICommentInit } from "#types/entities";

interface RequestBody extends APIRequest<ICommentInit> {}

export default withSessionRoute<ICommentClient>(async (req, res) => {
  if (req.method === "POST") {
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

    const isBodyPresent = "data" in req.body;

    if (!isBodyPresent) {
      return res.status(UNPROCESSABLE_ENTITY).json({
        is_succesfull: false,
        errors: ["Invalid body."],
      });
    }

    const result = await validateCommentInitFields(
      (req.body as RequestBody).data
    );

    if (!result.is_successfull) {
      const errors = result.errors.map((error) => JSON.stringify(error));
      return res.status(UNPROCESSABLE_ENTITY).json({
        is_succesfull: false,
        errors: errors,
      });
    }

    const { data: commentInit } = result;
    const { account_id: accID, ...newComment } = await createComment(
      account_id,
      commentInit
    );

    return res.status(OK).json({ is_succesfull: true, data: newComment });
  }
});
