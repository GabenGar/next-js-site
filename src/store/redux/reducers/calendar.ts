import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createNewNote } from "#lib/api/public";
import { formatDatestamp, fromISOString } from "#lib/dates";

import type { ICalendarNoteClient, ICalendarNoteInit } from "#types/entities"
import type { AppState, AppThunk, Status } from "#store/redux";

export interface CalendarState {
  selectedDate?: Date;
  status: Status;
  notes: Record<string, ICalendarNoteClient[]>
}

const initialState: CalendarState = {
  status: "idle",
  notes: {}
};

export const addNoteAsync = createAsyncThunk(
  "calendar/addNote",
  async (noteInit: ICalendarNoteInit) => {
    const response = await createNewNote(noteInit);
    return response;
  }
);

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    selectDate: (state, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNoteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNoteAsync.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        const newNote = action.payload.data!
        const noteDate = fromISOString(newNote.date as string)
        const dateStamp = formatDatestamp(noteDate)
        if (!state.notes[dateStamp]) {
          state.notes[dateStamp] = [newNote]
        } else {
          const newNotes = [...state.notes[dateStamp]];
        }

        state.status = "idle";

      });
  },
});

export const { selectDate } = calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNotes = (state: AppState) => state.calendar.notes;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectNotes(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };
