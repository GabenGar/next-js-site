import { useEffect, useState } from "react";
import { getDate, getMonth, getYear, isSameDay, startOfDay } from "date-fns";
import { fromISOString, toISODateTime } from "#lib/dates";
import { createNewNote } from "#lib/api/public";
import { Heading } from "#components/headings";
import { DateTimeView } from "#components/dates";
import { Form } from "#components/forms";
import { ButtonSubmit } from "#components/buttons";
import { FormSectionTime, TextArea } from "#components/forms/sections";
import { SVGIcon } from "#components/icons";
import { Notes } from "./notes";
import styles from "./day-overview.module.scss";

import type { ICalendarNoteClient, ICalendarNoteInit } from "#types/entities";
import type { ISubmitEvent, IFormElements } from "#components/forms";

interface IDayoveriewProps {
  selectedDay?: Date;
  monthNotes: ICalendarNoteClient[];
}

export function DayOverview({ selectedDay, monthNotes }: IDayoveriewProps) {
  const dayStart = selectedDay
    ? startOfDay(selectedDay)
    : startOfDay(new Date());
  const [notes, changeNotes] = useState<ICalendarNoteClient[]>(
    (selectedDay && getDayNotes(monthNotes, selectedDay)) || []
  );

  function getDayNotes(monthNotes: ICalendarNoteClient[], selectedDay: Date) {
    const dayNotes = monthNotes.filter((note) =>
      isSameDay(fromISOString(note.date as string), selectedDay)
    );
    return dayNotes;
  }

  useEffect(() => {
    if (!selectedDay) {
      return
    }

    const newNotes = getDayNotes(monthNotes, selectedDay)
    changeNotes(newNotes)
  }, [selectedDay, monthNotes])

  async function addNote(event: ISubmitEvent) {
    event.preventDefault();
    const formFields = ["time", "note"] as const;
    const elements = event.currentTarget.elements as IFormElements<
      typeof formFields[number]
    >;

    const date = elements["time"].valueAsDate;
    const note = elements["note"].value;

    if (!date || !note.trim() || !selectedDay) {
      console.log("Something is wrong!");
      return;
    }

    date.setFullYear(
      getYear(selectedDay),
      getMonth(selectedDay),
      getDate(selectedDay)
    );

    const isoDate = toISODateTime(date);
    const noteInit: ICalendarNoteInit = {
      date: isoDate,
      note,
    };

    const { success, data: newNote, errors } = await createNewNote(noteInit);

    if (!success || !newNote) {
      console.log(errors);
      return;
    }

    changeNotes(notes.concat(newNote));
  }

  return (
    <div className={styles.block}>
      {!selectedDay ? (
        <>
          <Heading level={2}>Day overview</Heading>
          <p>Select a day for overview</p>
        </>
      ) : (
        <>
          <Heading level={2}>
            Overview for <DateTimeView dateTime={selectedDay} />
          </Heading>
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
            <div className={styles.inputs}>
              <FormSectionTime
                id="new-time"
                name="time"
                required
                defaultValue={dayStart}
              >
                Time
              </FormSectionTime>
              <TextArea id="new-note" name="note" required>
                Note
              </TextArea>
            </div>
          </Form>
          <Notes
            notes={notes}
            onNoteRemoval={(noteID) => {
              const newNotes = notes.filter(({ id }) => id !== noteID);
              changeNotes(newNotes);
            }}
          />
        </>
      )}
    </div>
  );
}
