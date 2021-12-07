import { baseFormatter, areaFormatter } from "./formatters";

export function formatNumber(inputNumber: number) {
  const formattedNumber = baseFormatter.format(inputNumber);

  return formattedNumber;
}

export function formatArea(inputNumber: number) {
  const formattedArea = areaFormatter.format(inputNumber);

  return formattedArea;
}
