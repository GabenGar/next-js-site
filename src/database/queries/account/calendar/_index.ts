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
    INSERT INTO calendar_notes (date, note)
    VALUES ($(date), $(note))
    WHERE id = $(account_id)
    RETURNING *
  `;

  const newNote = await db.one<ICalendarNote>(query, { date, note, account_id: accountID });
  
  return newNote;
}

export async function removeCalendarNote(accountID: number, noteID: number) {

}

export async function updateCalendarNote() {}
