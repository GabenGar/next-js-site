import {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_AUTHORIZED,
} from "#environment/constants/http";
import { getAccountDetails, withSessionRoute } from "#lib/account";
import { addCalendarNote } from "#database/queries/account/calendar";
import type { APIResponse } from "#types/api";
import type { ICalendarNote } from "#types/entities";

export default withSessionRoute<APIResponse<ICalendarNote>>(
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
      const { data } = req.body;
      const isValidBody = [
        "date" in data,
        typeof data.date === "string",
        "note" in data,
        typeof data.note === "string",
      ].every((value) => value);

      if (!isValidBody) {
        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          errors: ["Invalid body."],
        });
      }

      const { date, note }: { date: string; note: string } = data;

      const { account_id: accID, ...newNote } = await addCalendarNote(
        account_id,
        date,
        note
      );

      return res.status(OK).json({ success: true, data: newNote });
    }
  }
);
