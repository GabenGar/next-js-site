import { HTMLUl } from "#components/html/ul";
import { HTMLLi } from "#components/html/li";
import { Button } from "#components/buttons";
import { SVGIcon } from "#components/icons";
import { TimeView } from "#components/dates";
import styles from "./notes.module.scss";

import type { ICalendarNoteClient } from "#types/entities";

interface INotesProps {
  notes: ICalendarNoteClient[];
  onNoteRemoval: (noteID: ICalendarNoteClient["id"]) => void;
}

export function Notes({ notes, onNoteRemoval }: INotesProps) {
  return (
    <div className={styles.notes}>
      <HTMLUl className={styles.list}>
        {!notes.length ? (
          <HTMLLi>No notes exist for this day.</HTMLLi>
        ) : (
          notes.map((note) => (
            <HTMLLi key={note.id} className={styles.note}>
              <div className={styles.info}>
                <TimeView dateTime={note.date} />
                <p>{note.note}</p>
              </div>

              <Button
                className={styles.remove}
                onClick={() => {
                  onNoteRemoval(note.id);
                }}
              >
                <SVGIcon iconID="calendar-minus" />
                <span>Remove</span>
              </Button>
            </HTMLLi>
          ))
        )}
      </HTMLUl>
    </div>
  );
}
