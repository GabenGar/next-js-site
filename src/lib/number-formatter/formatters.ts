import { ES_UNITS } from "#environment/constants";

export const baseFormatter = new Intl.NumberFormat(undefined, {
  style: "decimal",
});
// export const unitFormatter = new Intl.NumberFormat(undefined, {
//   style: "unit",
// });
export const areaFormatter = new Intl.NumberFormat(undefined, {
  style: "unit", unit: ES_UNITS.KILOMETER
});
