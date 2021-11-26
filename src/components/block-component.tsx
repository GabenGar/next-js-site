import { BlockProps } from "#types";

/**
 * TODO: fix typing.
 * @param blockClassName `className` of the root element
 * @param functionComponent
 * @returns Wrapped function.
 */
export function blockComponent<T = BlockProps<"div">>(
  blockClassName: string,
  functionComponent: (props: T) => JSX.Element
) {
  return ({ className, ...blockProps }: T) => {
    const blockClass = [
      blockClassName ? blockClassName : "",
      className ? className : "",
    ].join(" ");
    return functionComponent({ className: blockClass, ...blockProps });
  };
}
