import type { ICalendarNote } from "#types/entities";

export interface IClientNote extends Omit<ICalendarNote, "account_id"> {}
