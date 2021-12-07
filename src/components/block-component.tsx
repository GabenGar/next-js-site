import { BlockProps } from "#types";

/**
 * TODO: fix typing.
 * @param blockClassName `className` of the root element
 * @param functionComponent
 * @returns Wrapped function.
 */
export function blockComponent<T = BlockProps<"div">>(
  blockClassName: string | string[],
  functionComponent: (props: T) => JSX.Element
) {
  // @ts-expect-error fix later
  return ({ className, ...blockProps }: T) => {
    let baseClass;

    if (blockClassName instanceof Array) {
      baseClass = blockClassName.join(" ");
    } else {
      baseClass = blockClassName;
    }

    const blockClass = [
      baseClass ? baseClass : "",
      className ? className : "",
    ].join(" ");
    // @ts-expect-error fix later
    return functionComponent({ className: blockClass, ...blockProps });
  };
}
