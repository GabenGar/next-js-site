import { formatTime, fromISOString, toISOString } from "#lib/dates";
import { HTMLUl } from "#components/html/ul";
import { HTMLLi } from "#components/html/li";
import { Heading } from "#components/headings";
import { Form } from "#components/forms";
import { Button, ButtonSubmit } from "#components/buttons";
import { SVGIcon } from "#components/icons";
import { FormSectionTime, TextArea } from "#components/forms/sections";
import styles from "./notes.module.scss";

import type { ICalendarNote } from "#types/entities";
import type { ISubmitEvent, IFormElements } from "#components/forms";

interface INotesProps {
  notes: ICalendarNote[];
  onNoteAddition: (date: Date, note: string) => void;
  onNoteRemoval: (noteID: ICalendarNote["id"]) => void;
}

export function Notes({ notes, onNoteAddition, onNoteRemoval }: INotesProps) {
  function addNote(event: ISubmitEvent) {
    event.preventDefault();
    const formFields = ["time", "note"] as const;
    const elements = event.currentTarget.elements as IFormElements<
      typeof formFields[number]
    >;

    const date = elements["time"].valueAsDate;
    const note = elements["note"].value;

    console.log(date, elements["time"].value);

    if (!date || !note.trim()) {
      return;
    }

    onNoteAddition(date, note);
  }

  return (
    <div className={styles.notes}>
      <Heading level={2}>Notes</Heading>

      <Form
        className={styles.new}
        onSubmit={addNote}
        submitButton={
          <ButtonSubmit className={styles.add}>
            <SVGIcon iconID="calendar-plus" />
            <span>Add</span>
          </ButtonSubmit>
        }
      >
        <div className={styles.inputs} >
          <FormSectionTime id="new-time" name="time" required />
          <TextArea id="new-note" name="note" required />
        </div>
      </Form>

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
