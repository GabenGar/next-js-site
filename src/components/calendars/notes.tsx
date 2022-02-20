import { formatTime } from "#lib/dates";
import { HTMLUl } from "#components/html/ul";
import { HTMLLi } from "#components/html/li";
import { Heading } from "#components/headings";
import styles from "./_index.module.scss";

import type { ICalendarNote } from "#types/entities";

interface INotesProps {
  notes: ICalendarNote[];
}

export function Notes({ notes }: INotesProps) {
  const isNotes = Boolean(notes.length);

  return (
    <div className={styles.notes}>
      <Heading level={2}>Notes</Heading>
      <HTMLUl className={styles.list}>
        {notes.map((note) => (
          <HTMLLi key={note.id} className={styles.note}>
            <span>{formatTime(note.date)}</span>
            <p>{note.note}</p>
          </HTMLLi>
        ))}
      </HTMLUl>
    </div>
  );
}
