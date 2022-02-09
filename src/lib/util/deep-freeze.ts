/**
 * Freezes an object recusively.
 * @param obj
 */
export function deepFreeze(obj: Record<string, unknown>) {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = obj[name];

    if (!value) {
      continue;
    }

    if (typeof value === "object") {
      deepFreeze(value as Record<string, unknown>);
    }
  }

  return Object.freeze(obj);
}

function freezeArray(array: Array<unknown>) {
  return Object.freeze(array);
}
