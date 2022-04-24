import {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from "#environment/constants/http";
import { getAccountDetails } from "#lib/account";
import { withSessionRoute } from "#server/requests";
import { getCalendarNotesForMonth } from "#database/queries/account/calendar";
import { fromISOString } from "#lib/dates";

import type { APIRequest, APIResponse } from "#types/api";
import type { ICalendarNote, ICalendarNoteClient } from "#types/entities";
import type { IISODateTime } from "#codegen/schema/interfaces";

interface RequestBody extends APIRequest<{ date: IISODateTime }> {}

export default withSessionRoute<ICalendarNote[]>(async (req, res) => {
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

    // @TODO proper validation
    const { data }: RequestBody = req.body;
    const isValidBody = [
      data,
      // @ts-expect-error
      "date" in data,
      // @ts-expect-error
      typeof data.date === "string",
    ].every((value) => value);

    if (!isValidBody) {
      return res.status(UNPROCESSABLE_ENTITY).json({
        is_successful: false,
        errors: ["Invalid body."],
      });
    }

    const { date } = data!;

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

    return res.status(OK).json({ is_successful: true, data: clientNotes });
  }
});
