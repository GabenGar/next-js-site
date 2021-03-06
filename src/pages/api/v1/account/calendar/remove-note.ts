import {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from "#environment/constants/http";
import { getAccountDetails } from "#lib/account";
import { withSessionRoute } from "#server/requests";
import { removeCalendarNote } from "#database/queries/account/calendar";
import type { APIRequest, APIResponse } from "#types/api";
import type { ICalendarNoteClient } from "#types/entities";

interface RequestBody extends APIRequest<{ note_id: number }> {}

export default withSessionRoute<ICalendarNoteClient>(async (req, res) => {
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
      "note_id" in data,
      // @ts-expect-error
      typeof data.note_id === "number",
    ].every((value) => value);

    if (!isValidBody) {
      return res.status(UNPROCESSABLE_ENTITY).json({
        is_successful: false,
        errors: ["Invalid body."],
      });
    }

    const { note_id } = data!;

    const { account_id: accID, ...removedNote } = await removeCalendarNote(
      account_id,
      note_id
    );

    return res.status(OK).json({ is_successful: true, data: removedNote });
  }
});
