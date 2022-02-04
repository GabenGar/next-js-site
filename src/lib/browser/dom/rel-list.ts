import { allowedValuesA } from "./types";

/**
 * `rel` for `<a>` and `<area>`.
 */
export class RelListA extends DOMTokenList {
  /**
   * Values are taken from [related MDN article](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).
   */
  static ALLOWED_VALUES = allowedValuesA;

  constructor(...values: string[]) {
    super();

    const filteredValues = values.filter((value) => {
      return RelListA.ALLOWED_VALUES.has(value);
    });

    this.add(...filteredValues);
  }
}
