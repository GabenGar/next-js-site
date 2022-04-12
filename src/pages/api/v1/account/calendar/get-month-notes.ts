import {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from "#environment/constants/http";
import { getAccountDetails, withSessionRoute } from "#lib/account";
import { getCalendarNotesForMonth } from "#database/queries/account/calendar";
import { fromISOString } from "#lib/dates";

import type { APIRequest, APIResponse } from "#types/api";
import type { ICalendarNote, ICalendarNoteClient } from "#types/entities";
import type { IISODateTime } from "#codegen/schema/interfaces";

interface RequestBody extends APIRequest<{ date: IISODateTime }> {}

export default withSessionRoute<APIResponse<ICalendarNote[]>>(
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
      const { data }: RequestBody = req.body;
      const isValidBody = [
        data,
        "date" in data,
        typeof data.date === "string",
      ].every((value) => value);

      if (!isValidBody) {
        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          errors: ["Invalid body."],
        });
      }

      const { date } = data;

      const notes = await getCalendarNotesForMonth(
        account_id,
        fromISOString(date)
      );

      const clientNotes = notes.map<ICalendarNoteClient>(
        ({ created_at, date, id, note }) => {
          return {
            created_at,
            date,
            id,
            note,
          };
        }
      );

      return res.status(OK).json({ success: true, data: clientNotes });
    }
  }
);
