import React from "react";

/**
 * Figures out if the button is clicked in the event.
 * @param event
 * @param className
 * @returns The clicked button if successfull
 */
export function buttonClicked(
  event: MouseEvent | React.MouseEvent,
  className: string
): undefined | HTMLButtonElement {
  const target = event.target as HTMLButtonElement;

  if (target.classList.contains(className)) {
    return target;
  }

  if (target.closest(`.${className}`)) {
    return target.closest(`.${className}`) as HTMLButtonElement;
  }

  return;
}
