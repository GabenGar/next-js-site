import { formatTime, fromISOString } from "#lib/dates";
import { HTMLUl } from "#components/html/ul";
import { HTMLLi } from "#components/html/li";
import { Heading } from "#components/headings";
import { Form } from "#components/forms";
import { Button, ButtonSubmit } from "#components/buttons";
import styles from "./notes.module.scss";

import type { ICalendarNote } from "#types/entities";
import type { ISubmitEvent, IFormElements } from "#components/forms";
import { SVGIcon } from "#components/icons";

interface INotesProps {
  dayDate: Date;
  notes: ICalendarNote[];
  onNoteAddition: (note: ICalendarNote) => void;
  onNoteRemoval: (noteID: ICalendarNote["id"]) => void;
}

export function Notes({ dayDate, notes, onNoteAddition, onNoteRemoval }: INotesProps) {
  function addNote(event: ISubmitEvent) {
    event.preventDefault();
    const formFields = ["time", "note"] as const;
    const elements = event.currentTarget.elements as IFormElements<
      typeof formFields[number]
    >;

    const id = Math.max(...notes.map(({ id }) => id)) + 1;
    const time = elements["time"].value;
    const newNote: ICalendarNote = {
      id,
      created_at: new Date(),
      date: fromISOString(time),
      note: elements["note"].value,
    };

    onNoteAddition(newNote);
  }

  return (
    <div className={styles.notes}>
      <Heading level={2}>Notes</Heading>

      <Form
        onSubmit={addNote}
        submitButton={
          <ButtonSubmit className={styles.add}>
            <SVGIcon iconID="calendar-plus" />
            <span>Add</span>
          </ButtonSubmit>
        }
      ></Form>

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
