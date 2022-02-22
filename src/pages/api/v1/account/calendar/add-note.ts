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
          .status(401)
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

        return res.status(500).json({
          success: false,
          errors: ["Unknown Error."],
        });
      }
      const { body } = req;
      const isValidBody = [
        "date" in body,
        typeof body.date === "string",
        "note" in body,
        typeof body.note === "string",
      ].every((value) => value);

      if (!isValidBody) {
        return res.status(422).json({
          success: false,
          errors: ["Invalid body."],
        });
      }

      const { date, note }: { date: string; note: string } = body;

      const { account_id: accID, ...newNote } = await addCalendarNote(
        account_id,
        date,
        note
      );

      return res.status(200).json({ success: true, data: newNote });
    }
  }
);
