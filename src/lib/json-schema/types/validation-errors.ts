/**
 * The map of property keys and their related errors.
 */
export class ValidationErrors extends Map<string, Error[]> {
  /**
   * Combine errors from another `ValidationErrors` instance.
   * @param errorMap
   */
  mergeErrors(errorMap: ValidationErrors) {
    for (const [key, errors] of Array.from(errorMap.entries())) {
      if (this.has(key)) {
        const originalErrors = Array.from(this.get(key)!);
        this.set(key, [...originalErrors, ...errors]);
      } else {
        this.set(key, errors);
      }
    }

    return this;
  }

  /**
   * Adds an error to the error map.
   * @param key
   * @param error
   */
  addError(key: string, error: Error | string) {
    if (typeof error === "string") {
      if (!this.has(key)) {
        this.set(key, [Error(error)]);
      } else {
        this.get(key)!.push(Error(error));
      }
    }

    if (error instanceof Error) {
      if (!this.has(key)) {
        this.set(key, [error]);
      } else {
        this.get(key)!.push(error);
      }
    }

    return this;
  }

  /**
   * @returns A list of error strings.
   */
  toDict() {
    const errorsList: string[] = [];

    for (const [key, errors] of Array.from(this)) {
      const errorsMessage = errors.map((error) => error.toString()).join(", ");
      const error = `${key}: ${errorsMessage}`;
      errorsList.push(error);
    }

    return errorsList;
  }

  toString() {
    const errorsDict = this.toDict();

    return JSON.stringify(errorsDict);
  }
}
