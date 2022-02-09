/**
 * Freezes an object recusively.
 * @param item
 */
export function deepFreeze(item: Record<string, unknown> | Array<unknown>) {

  if (item instanceof Array) {
    freezeArray(item)
  }

  if (typeof item === "object") {
    freezeObject(item as Record<string, unknown>)
  }

  return Object.freeze(item)
}

function freezeObject(obj: Record<string, unknown>) {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = obj[name];

    if (!value) {
      continue;
    }

    if (value instanceof Array) {
      freezeArray(value);
    }

    if (typeof value === "object") {
      freezeObject(value as Record<string, unknown>);
    }
  }

  return Object.freeze(obj);
}

function freezeArray(array: Array<unknown>) {
  return Object.freeze(array);
}
