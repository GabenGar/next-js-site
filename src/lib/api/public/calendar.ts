import { ProjectError } from "#lib/errors";
import { apiV1Fetch } from "./fetch";
import { createRequestBody } from "./fetch";

import type { APIResponse } from "#types/api";
import type { ICalendarNoteClient, ICalendarNoteInit } from "#types/entities";
import type { IISODateTime } from "#codegen/schema/interfaces";

export async function getMonthNotes(monthDate: IISODateTime) {
  const response = await apiV1Fetch("/account/calendar/get-month-notes", {
    method: "POST",
    body: JSON.stringify({ data: { date: monthDate } }),
  });
  const result: APIResponse<ICalendarNoteClient[]> = await response.json();

  if (!result.is_successful) {
    throw new ProjectError(String(result));
  }

  return result;
}

export async function createNewNote(noteInit: ICalendarNoteInit) {
  const response = await apiV1Fetch("/account/calendar/add-note", {
    method: "POST",
    body: JSON.stringify({ data: noteInit }),
  });
  const result: APIResponse<ICalendarNoteClient> = await response.json();

  if (!result.is_successful) {
    throw new ProjectError(String(result));
  }

  return result;
}

export async function removeNote(noteID: number) {
  const response = await apiV1Fetch("/account/calendar/remove-note", {
    method: "POST",
    body: createRequestBody<{ note_id: number }>({ note_id: noteID }),
  });
  const result: APIResponse<ICalendarNoteClient> = await response.json();

  if (!result.is_successful) {
    throw new ProjectError(String(result));
  }

  return result;
}
