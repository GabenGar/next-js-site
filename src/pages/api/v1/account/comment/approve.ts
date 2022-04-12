import {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_AUTHORIZED,
} from "#environment/constants/http";
import {
  getAccountDetails,
  withSessionRoute,
  approveComment,
} from "#lib/account";
import type { APIRequest, APIResponse } from "#types/api";
import type { ICommentClient, ISerialInteger } from "#types/entities";
import { validateSerialIntegerFields } from "#codegen/schema/validations";

interface RequestBody extends APIRequest<ISerialInteger> {}

export default withSessionRoute<APIResponse<ICommentClient>>(
  async (req, res) => {
    if (req.method === "POST") {
      const { account_id } = req.session;

      if (!account_id) {
        return res
          .status(NOT_AUTHORIZED)
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

      if (account.role !== "administrator") {
        return res
          .status(NOT_AUTHORIZED)
          .json({ success: false, errors: ["Not Authorized."] });
      }

      const isBodyPresent = "data" in req.body;

      if (!isBodyPresent) {
        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          errors: ["Invalid body."],
        });
      }

      const comID = await validateSerialIntegerFields(req.body.data);

      if (!comID) {
        const validationErrors = validateSerialIntegerFields.errors!.map(
          (errorObj) => JSON.stringify(errorObj)
        );

        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          errors: validationErrors,
        });
      }

      const commentID = (req.body as RequestBody).data;

      const { account_id: accID, ...newComment } = await approveComment(
        account_id,
        commentID
      );

      return res.status(OK).json({ success: true, data: newComment });
    }
  }
);
