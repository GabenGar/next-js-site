import { getDB } from "#database";
import { ICalendarNote } from "#types/entities";

const { db } = getDB();

export async function getCalendarNotesForYear() {}

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
