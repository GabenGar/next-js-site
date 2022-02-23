import {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_AUTHORIZED,
} from "#environment/constants/http";
import { getAccountDetails, withSessionRoute } from "#lib/account";
import { removeCalendarNote } from "#database/queries/account/calendar";
import type { APIRequest, APIResponse } from "#types/api";
import type { ICalendarNotePublic } from "#types/entities";

interface RequestBody extends APIRequest<{ note_id: number }> {}

export default withSessionRoute<APIResponse<ICalendarNotePublic>>(
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
      const { data }: RequestBody = req.body;
      const isValidBody = [
        data,
        "note_id" in data,
        typeof data.note_id === "number",
      ].every((value) => value);

      if (!isValidBody) {
        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          errors: ["Invalid body."],
        });
      }

      const { note_id } = data;

      const { account_id: accID, ...removedNote } = await removeCalendarNote(
        account_id,
        note_id
      );

      return res.status(OK).json({ success: true, data: removedNote });
    }
  }
);
