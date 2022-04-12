import {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_AUTHORIZED,
} from "#environment/constants/http";
import {
  getAccountDetails,
  withSessionRoute,
  createComment,
} from "#lib/account";
import type { APIRequest, APIResponse } from "#types/api";
import type { IComment, ICommentClient, ICommentInit } from "#types/entities";
import { validateCommentInitFields } from "#codegen/schema/validations";

interface RequestBody extends APIRequest<ICommentInit> {}

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

      const isBodyPresent = "data" in req.body;

      if (!isBodyPresent) {
        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          errors: ["Invalid body."],
        });
      }

      const noteInit = await validateCommentInitFields(req.body.data);

      if (!noteInit) {
        const validationErrors = validateCommentInitFields.errors!.map(
          (errorObj) => JSON.stringify(errorObj)
        );

        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          errors: validationErrors,
        });
      }

      const commentInit = (req.body as RequestBody).data;

      const { account_id: accID, ...newComment } = await createComment(
        account_id,
        commentInit
      );

      return res.status(OK).json({ success: true, data: newComment });
    }
  }
);
