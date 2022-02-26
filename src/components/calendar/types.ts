import type { ICalendarNoteClient } from "#types/entities";

/**
 * @todo Implement it.
 */
export interface ICalendarDay {
  dayDate: Date;
  notes: ICalendarNoteClient[];
}
