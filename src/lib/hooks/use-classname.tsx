/**
 * TODO: make it an actual hook.
 */
export function useClassName(classNames: Array<string | undefined>): string {
  const className = classNames.filter((str) => str && String(str)).join(" ");

  return className;
}
