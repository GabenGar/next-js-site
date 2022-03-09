import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createNewNote,
  removeNote,
  getMonthNotes as fetchMonthNotes,
} from "#lib/api/public";
import { nowISO, compareAscending, isSameDay } from "#lib/dates";

import type { ICalendarNoteClient, ICalendarNoteInit } from "#types/entities";
import type { AppState, AppThunk, Status } from "#store/redux";
import type { IISODateTime } from "#codegen/schema/interfaces";

export interface CalendarState {
  currentDate: IISODateTime;
  selectedDate: IISODateTime;
  selectedDay: IISODateTime;
  status: Status;
  notes: ICalendarNoteClient[];
}

const reducerName = "calendar";

const initialState: CalendarState = {
  currentDate: nowISO(),
  selectedDate: nowISO(),
  selectedDay: nowISO(),
  status: "idle",
  notes: [],
};

export const getMonthNotes = createAsyncThunk(
  `${reducerName}/getMonthNotes`,
  async (monthDate: IISODateTime) => {
    const response = await fetchMonthNotes(monthDate);
    return response;
  }
);

export const addNoteAsync = createAsyncThunk(
  `${reducerName}/addNote`,
  async (noteInit: ICalendarNoteInit) => {
    const response = await createNewNote(noteInit);
    return response;
  }
);

export const removeNoteAsync = createAsyncThunk(
  `${reducerName}/removeNote`,
  async (noteID: number) => {
    const response = await removeNote(noteID);
    return response;
  }
);

export const calendarSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    changeSelectedDate: (state, action: PayloadAction<IISODateTime>) => {
      state.selectedDate = action.payload;
    },
    /**
     * Used for selecting a day in a month.
     * A separate value to preserve the day selection
     * regardless of curetly viewed date.
     */
    changeSelectedDay: (state, action: PayloadAction<IISODateTime>) => {
      state.selectedDay = action.payload;
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

        state.notes = [...state.notes, newNote].sort((prevNote, nextNote) =>
          compareAscending(prevNote.date, nextNote.date)
        );

        state.status = "idle";
      })
      .addCase(removeNoteAsync.fulfilled, (state, action) => {
        const { id: noteID } = action.payload.data!;
        const newNotes = state.notes.filter(({ id }) => id !== noteID);

        state.notes = newNotes;
      });
  },
});

export const { changeSelectedDate, changeSelectedDay } = calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer;

export function selectCalendar(state: AppState) {
  return state.calendar;
}

export function selectNotesForDay(day: IISODateTime) {
  return (state: AppState) => {
    return state.calendar.notes.filter((note) => isSameDay(note.date, day));
  };
}
