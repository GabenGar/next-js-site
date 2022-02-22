import { Heading } from "#components/headings";
import { Notes } from "./notes";

import styles from "./day-overview.module.scss";

interface IDayoveriewProps {
  selectedDay?: Date;
}

export function DayOverview({ selectedDay }: IDayoveriewProps) {
  return (
    <div className={styles.block}>
      <Heading level={2}>Overview</Heading>
      {!selectedDay ? (
        <p>Select a day for overview</p>
      ) : (
        <Notes notes={[]} onNoteAddition={() => {}} onNoteRemoval={() => {}} />
      )}
    </div>
  );
}
