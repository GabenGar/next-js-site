import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { calendarReducer } from "#store/redux/reducers";

import type { ThunkAction, Action } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";

const statuses = ["idle", "loading", "failed"] as const;
export type Status = typeof statuses[number];

export const reduxStore = makeStore();

export function makeStore() {
  return configureStore({
    reducer: {
      calendar: calendarReducer,
    },
  });
}

export type AppState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

/**
 * Typed dispatch.
 */
export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

/**
 * Typed selector.
 */
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
