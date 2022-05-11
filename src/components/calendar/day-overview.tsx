import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "#browser/store/redux";
import { addNoteAsync, selectNotesForDay } from "#browser/store/redux/reducers";
import {
  fromISOString,
  toISODateTime,
  startOfDay,
  getDayOfMonth,
  getYear,
  getMonth,
} from "#lib/dates";
import { Heading } from "#components/headings";
import { DateTimeView } from "#components/dates";
import { Form } from "#components/forms";
import { ButtonSubmit } from "#components/buttons";
import { FormSectionTime, TextArea } from "#components/forms/sections";
import { Notes } from "./notes";
import styles from "./day-overview.module.scss";

import type { ICalendarNoteInit } from "#types/entities";
import type { ISubmitEvent, IFormElements } from "#components/forms";
import type { IISODateTime } from "#codegen/schema/interfaces";

interface IDayoveriewProps {
  selectedDay: IISODateTime;
}

export function DayOverview({ selectedDay }: IDayoveriewProps) {
  const { t } = useTranslation("components");
  const dispatch = useAppDispatch();
  const dayNotes = useAppSelector(selectNotesForDay(selectedDay));
  const dayStart = startOfDay(selectedDay);

  async function addNote(event: ISubmitEvent) {
    event.preventDefault();
    const formFields = ["time", "note"] as const;
    const form = event.currentTarget;
    const elements = form.elements as IFormElements<typeof formFields[number]>;
    const date = elements["time"].valueAsDate;
    const note = elements["note"].value;

    if (!date || !note.trim()) {
      console.log("Something is wrong!");
      return;
    }

    date.setFullYear(
      getYear(selectedDay),
      getMonth(selectedDay),
      getDayOfMonth(selectedDay)
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
      <Heading level={2}>
        {t("calendar_day_overview")} <DateTimeView dateTime={selectedDay} />
      </Heading>
      <Form
        className={styles.new}
        onSubmit={addNote}
        submitButton={
          <ButtonSubmit className={styles.add} iconID="calendar-plus">
            {t("add")}
          </ButtonSubmit>
        }
      >
        <div className={styles.inputs}>
          <FormSectionTime
            id="new-time"
            name="time"
            required
            defaultValue={fromISOString(dayStart)}
          >
            {t("calendar_note_time")}
          </FormSectionTime>
          <TextArea id="new-note" name="note" required>
          {t("calendar_note_text")}
          </TextArea>
        </div>
      </Form>
      <Notes notes={dayNotes} />
    </div>
  );
}
