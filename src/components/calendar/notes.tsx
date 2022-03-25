import { useTranslation } from "next-i18next";
import { useAppDispatch } from "#store/redux";
import { removeNoteAsync } from "#store/redux/reducers";
import { HTMLUl } from "#components/html/ul";
import { HTMLLi } from "#components/html/li";
import { Button } from "#components/buttons";
import { TimeView } from "#components/dates";
import styles from "./notes.module.scss";

import type { ICalendarNoteClient } from "#types/entities";

interface INotesProps {
  notes: ICalendarNoteClient[];
}

export function Notes({ notes }: INotesProps) {
  const { t } = useTranslation("components");
  const dispatch = useAppDispatch();

  return (
    <div className={styles.notes}>
      <HTMLUl className={styles.list}>
        {!notes.length ? (
          <HTMLLi>{t("calendar_no_notes")}</HTMLLi>
        ) : (
          notes.map((note) => (
            <HTMLLi key={note.id} className={styles.note}>
              <div className={styles.info}>
                <TimeView dateTime={note.date} />
                <p>{note.note}</p>
              </div>

              <Button
                className={styles.remove}
                iconID="calendar-minus"
                onClick={() => {
                  dispatch(removeNoteAsync(note.id));
                }}
              >
                {t("remove")}
              </Button>
            </HTMLLi>
          ))
        )}
      </HTMLUl>
    </div>
  );
}
