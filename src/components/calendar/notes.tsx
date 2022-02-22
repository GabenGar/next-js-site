import { formatTime } from "#lib/dates";
import { HTMLUl } from "#components/html/ul";
import { HTMLLi } from "#components/html/li";
import { Button } from "#components/buttons";
import { SVGIcon } from "#components/icons";

import styles from "./notes.module.scss";

import type { IClientNote } from "./types";

interface INotesProps {
  notes: IClientNote[];
  onNoteRemoval: (noteID: IClientNote["id"]) => void;
}

export function Notes({ notes, onNoteRemoval }: INotesProps) {
  return (
    <div className={styles.notes}>
      <HTMLUl className={styles.list}>
        {!notes.length ? (
          <HTMLLi>No notes exist for this day.</HTMLLi>
        ) : (
          notes.map((note) => (
            <HTMLLi key={note.id} id={String(note.id)} className={styles.note}>
              <span>{formatTime(note.date)}</span>
              <p>{note.note}</p>
              <Button
                onClick={() => {
                  onNoteRemoval(note.id);
                }}
              >
                <SVGIcon iconID="calendar-minus"></SVGIcon>
                Remove
              </Button>
            </HTMLLi>
          ))
        )}
      </HTMLUl>
    </div>
  );
}
