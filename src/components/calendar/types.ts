import type { ICalendarNotePublic } from "#types/entities";

/**
 * @todo Implement it. 
 */
export interface ICalendarDay {
  dayDate: Date;
  notes: ICalendarNotePublic[];
}
