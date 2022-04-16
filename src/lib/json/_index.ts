export interface IJSONOptions {
  /**
   * @default true
   */
  isPretty?: boolean;
}

const defaultJSONOptions: IJSONOptions = {
  isPretty: true,
};

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
export function fromJSON<OutputType extends unknown>(json: string): OutputType {
  return JSON.parse(json);
}
