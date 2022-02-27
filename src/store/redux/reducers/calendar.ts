import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { compareAsc, isSameDay } from "date-fns";
import {
  createNewNote,
  removeNote,
  getMonthNotes as fetchMonthNotes,
} from "#lib/api/public";
import { fromISOString } from "#lib/dates";

import type { ICalendarNoteClient, ICalendarNoteInit } from "#types/entities";
import type { AppState, AppThunk, Status } from "#store/redux";

export interface CalendarState {
  selectedDate?: Date;
  status: Status;
  notes: ICalendarNoteClient[];
}

const initialState: CalendarState = {
  status: "idle",
  notes: [],
};

export const getMonthNotes = createAsyncThunk(
  "calendar/getMonthNotes",
  async (monthDate: Date) => {
    const response = await fetchMonthNotes(monthDate);
    return response;
  }
);

export const addNoteAsync = createAsyncThunk(
  "calendar/addNote",
  async (noteInit: ICalendarNoteInit) => {
    const response = await createNewNote(noteInit);
    return response;
  }
);

export const removeNoteAsync = createAsyncThunk(
  "calendar/removeNote",
  async (noteID: number) => {
    const response = await removeNote(noteID);
    return response;
  }
);

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    selectDate: (state, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMonthNotes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMonthNotes.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getMonthNotes.fulfilled, (state, action) => {
        const monthNotes = action.payload.data!;
        state.notes = monthNotes;
      })
      .addCase(addNoteAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        const newNote = action.payload.data!;
        const noteDate = fromISOString(newNote.date as string);
        newNote.date = noteDate;

        state.notes = [...state.notes, newNote].sort((prevNote, nextNote) =>
          compareAsc(prevNote.date as Date, nextNote.date as Date)
        );

        state.status = "idle";
      })
      .addCase(removeNoteAsync.rejected, (state) => {})
      .addCase(removeNoteAsync.fulfilled, (state, action) => {
        const { id: noteID } = action.payload.data!;
        const newNotes = state.notes.filter(({ id }) => id !== noteID);

        state.notes = newNotes
      });
  },
});

export const { selectDate } = calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer;

export function selectNotesForDay(day: Date) {
  return (state: AppState) => {
    return state.calendar.notes.filter((note) =>
      isSameDay(note.date as Date, day)
    );
  };
}

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
