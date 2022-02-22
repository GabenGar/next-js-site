import { apiV1Fetch } from "./fetch";

import type { APIResponse } from "#types/api";
import type { ICalendarNote, ICalendarNoteInit } from "#types/entities";

export async function createNewNote(noteInit: ICalendarNoteInit) {
  const response = await apiV1Fetch("/account/calendar/add-note", {
    method: "POST",
    body: JSON.stringify({ data: noteInit }),
  });
  const result: APIResponse<Omit<ICalendarNote, "account_id">> =
    await response.json();

  return result;
}
