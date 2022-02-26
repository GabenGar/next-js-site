import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { calendarReducer } from "#store/redux/reducers";

import type { ThunkAction, Action } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";

const statuses = ["idle", "loading", "failed"] as const;
export type Status = typeof statuses[number];

export const store = makeStore();

export function makeStore() {
  return configureStore({
    reducer: {
      calendar: calendarReducer,
    },
  });
}

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
