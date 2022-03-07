const weekDays = [0, 1, 2, 3, 4, 5, 6] as const;
export type IWeekDay = typeof weekDays[number];