export interface IJSONOptions {
  /**
   * @default true
   */
  isPretty?: boolean;
}

const defaultJSONOptions: IJSONOptions = {
  isPretty: true,
};

export function toJSON(value: any, options = { ...defaultJSONOptions }) {
  const finalOptions = options
    ? { ...defaultJSONOptions, ...options }
    : defaultJSONOptions;
  return JSON.stringify(
    value,
    undefined,
    finalOptions.isPretty ? 2 : undefined
  );
}
export function fromJSON<Type extends unknown>(
  json: string,
  options = defaultJSONOptions
): Type {
  const finalOptions = options
    ? { ...defaultJSONOptions, ...options }
    : defaultJSONOptions;
  return JSON.parse(json);
}
