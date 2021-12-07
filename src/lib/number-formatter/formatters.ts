import { CONSTANTS } from "#configs/public";

export const baseFormatter = new Intl.NumberFormat(undefined, {
  style: "decimal",
});
// export const unitFormatter = new Intl.NumberFormat(undefined, {
//   style: "unit",
// });
export const areaFormatter = new Intl.NumberFormat(undefined, {
  style: "unit", unit: CONSTANTS.ES_UNITS.KILOMETER
});
