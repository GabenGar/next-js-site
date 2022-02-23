import type { ICalendarNoteClient } from "#types/entities";

export interface ICalendarDay {
  dayDate: Date;
  notes: ICalendarNoteClient[];
}
