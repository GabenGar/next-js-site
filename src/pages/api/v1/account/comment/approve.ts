import {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  NOT_FOUND,
} from "#environment/constants/http";
import { getAccountDetails, approveComment } from "#lib/account";
import { withSessionRoute } from "#server/requests";
import { validateSerialIntegerFields } from "#codegen/schema/validations";

import type { APIRequest, APIResponse } from "#types/api";
import type { ICommentClient, ISerialInteger } from "#types/entities";

interface RequestBody extends APIRequest<ISerialInteger> {}

export default withSessionRoute<APIResponse<ICommentClient>>(
  async (req, res) => {
    if (req.method === "POST") {
      const { account_id } = req.session;

      if (!account_id) {
        return res
          .status(UNAUTHORIZED)
          .json({ success: false, errors: ["Not Authorized."] });
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
          success: false,
          errors: ["Unknown Error."],
        });
      }

      // @TODO: approval by non-admin
      if (account.role !== "administrator") {
        return res
          .status(NOT_FOUND)
          .json({ success: false, errors: ["Not Found."] });
      }

      const isBodyPresent = "data" in req.body;

      if (!isBodyPresent) {
        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          errors: ["Invalid body."],
        });
      }

      const result = await validateSerialIntegerFields(
        (req.body as RequestBody).data
      );

      if (!result.is_successfull) {
        const errors = result.errors.map((errorObj) =>
          JSON.stringify(errorObj)
        );

        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          errors: errors,
        });
      }

      const { data: commentID } = result;

      const { account_id: accID, ...newComment } = await approveComment(
        account_id,
        commentID
      );

      return res.status(OK).json({ success: true, data: newComment });
    }
  }
);
