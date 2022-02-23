import { apiV1Fetch } from "./fetch";
import { toISODateTime } from "#lib/dates";

import type { APIResponse } from "#types/api";
import type { ICalendarNote, ICalendarNoteClient, ICalendarNoteInit } from "#types/entities";

export async function getMonthNotes(monthDate: Date) {
  const response = await apiV1Fetch("/account/calendar/get-month-notes", {
    method: "POST",
    body: JSON.stringify({ data: { date: toISODateTime(monthDate) } }),
  });
  const result: APIResponse<ICalendarNoteClient[]> = await response.json();

  return result;
}

export async function createNewNote(noteInit: ICalendarNoteInit) {
  const response = await apiV1Fetch("/account/calendar/add-note", {
    method: "POST",
    body: JSON.stringify({ data: noteInit }),
  });
  const result: APIResponse<Omit<ICalendarNote, "account_id">> =
    await response.json();

  return result;
}
