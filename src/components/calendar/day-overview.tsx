import { useEffect } from "react";
import { getDate, getMonth, getYear, startOfDay } from "date-fns";
import { toISODateTime } from "#lib/dates";
import { useAppDispatch, useAppSelector } from "#store/redux";
import {
  addNoteAsync,
  selectNotesForDay,
} from "#store/redux/reducers";
import { Heading } from "#components/headings";
import { DateTimeView } from "#components/dates";
import { Form } from "#components/forms";
import { ButtonSubmit } from "#components/buttons";
import { FormSectionTime, TextArea } from "#components/forms/sections";
import { Notes } from "./notes";
import styles from "./day-overview.module.scss";

import type { ICalendarNoteInit } from "#types/entities";
import type { ISubmitEvent, IFormElements } from "#components/forms";

interface IDayoveriewProps {
  selectedDay: Date;
}

export function DayOverview({ selectedDay }: IDayoveriewProps) {
  const dispatch = useAppDispatch();
  const dayNotes = useAppSelector(selectNotesForDay(selectedDay));
  const dayStart = selectedDay
    ? startOfDay(selectedDay)
    : startOfDay(new Date());


  
  async function addNote(event: ISubmitEvent) {
    event.preventDefault();
    const formFields = ["time", "note"] as const;
    const form = event.currentTarget;
    const elements = form.elements as IFormElements<typeof formFields[number]>;
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

    dispatch(addNoteAsync(noteInit));
    form.reset();
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
              <ButtonSubmit className={styles.add} iconID="calendar-plus">
                Add
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
          <Notes notes={dayNotes} />
        </>
      )}
    </div>
  );
}
