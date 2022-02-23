import { getDB } from "#database";
import { toISODateTime } from "#lib/dates";
import { ICalendarNote } from "#types/entities";
import { endOfMonth, startOfMonth } from "date-fns";

const { db } = getDB();

export async function getCalendarNotesForMonth(
  accountID: number,
  monthDate: Date
) {
  const monthStart = toISODateTime(startOfMonth(monthDate));
  const monthEnd = toISODateTime(endOfMonth(monthDate));
  const query = `
    SELECT *
    FROM calendar_notes
    WHERE
      account_id = $(account_id)
      AND date >= $(month_start)
      AND date <= $(month_end)
  `;
  const notes = await db.manyOrNone<ICalendarNote>(query, {
    account_id: accountID,
    month_start: monthStart,
    month_end: monthEnd,
  });

  return notes;
}

export async function addCalendarNote(
  accountID: number,
  date: string,
  note: string
) {
  const query = `
    INSERT INTO calendar_notes (account_id, date, note)
    VALUES ($(account_id), $(date), $(note))
    RETURNING *
  `;

  const newNote = await db.one<ICalendarNote>(query, {
    date,
    note,
    account_id: accountID,
  });

  return newNote;
}

export async function removeCalendarNote(accountID: number, noteID: number) {}

export async function updateCalendarNote() {}
