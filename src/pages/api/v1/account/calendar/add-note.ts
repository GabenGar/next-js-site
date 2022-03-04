import {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_AUTHORIZED,
} from "#environment/constants/http";
import { getAccountDetails, withSessionRoute } from "#lib/account";
import { addCalendarNote } from "#database/queries/account/calendar";
import type { APIRequest, APIResponse } from "#types/api";
import type { ICalendarNote, ICalendarNoteInit } from "#types/entities";
import { validateCalendarNoteInitFields } from "#codegen/schema/validations";

interface RequestBody extends APIRequest<ICalendarNoteInit> {}

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

      const isBodyPresent = "data" in req.body;

      if (!isBodyPresent) {
        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          errors: ["Invalid body."],
        });
      }

      const noteInit = await validateCalendarNoteInitFields(req.body.data);

      if (!noteInit) {
        const validationErrors = validateCalendarNoteInitFields.errors!.map(
          (errorObj) => JSON.stringify(errorObj)
        );

        return res.status(UNPROCESSABLE_ENTITY).json({
          success: false,
          errors: validationErrors,
        });
      }

      const { date, note }: ICalendarNoteInit = req.body.data;

      const { account_id: accID, ...newNote } = await addCalendarNote(
        account_id,
        date,
        note
      );

      return res.status(OK).json({ success: true, data: newNote });
    }
  }
);
