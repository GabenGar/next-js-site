export interface IJSONOptions {
  /**
   * @default true
   */
  isPretty?: boolean;
}

const defaultJSONOptions: IJSONOptions = {
  isPretty: true,
};

export function toSerializedObject(value: unknown) {
  return fromJSON(toJSON(value)) 
}

export function toJSON<InputType = unknown>(
  value: InputType,
  options = defaultJSONOptions
) {
  const finalOptions = options
    ? { ...defaultJSONOptions, ...options }
    : defaultJSONOptions;
  return JSON.stringify(
    value,
    undefined,
    finalOptions.isPretty ? 2 : undefined
  );
}

export function fromJSON<OutputType extends unknown>(
  json: string
): OutputType | undefined {
  try {
    const result = JSON.parse(json);

    return result;
  } catch (error) {
    // @TODO more refined error handling
    if (!(error instanceof SyntaxError)) {
      throw error;
    }

    console.error(
      ["Failed to parse JSON", "JSON:", json, "Error Details:", error].join(
        "\n"
      )
    );
  }
}
