import type { FocusEvent } from "react";
/**
 * `onBlur` callback but only triggers the passed `callback`
 * when element's descendants aren't focused.
 * @TODO: types
 * @param callback A function to invoke on successful blur.
 * @param callbackArgs Arguments to pass to the said function.
 */
export function onParentBlur<DOMInterface extends Element>(
  callback: (...args: any[]) => void,
  ...callbackArgs: any[]
) {
  return (event: FocusEvent<DOMInterface>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      event.preventDefault();
      return;
    }

    if (callback) {
      callback(...callbackArgs);
    }
  };
}
