import type { ICalendarNotePublic } from "#types/entities";

export interface ICalendarDay {
  dayDate: Date;
  notes: ICalendarNotePublic[];
}
