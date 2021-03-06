import { BlockProps } from "#types/props";
import clsx from "clsx";

type FuncComponent<T> = (props: T, ref?: any) => JSX.Element;

/**
 * A decorator for components with a root element.
 * `className` prop passed to it will be appended to the classList,
 * instead of overwriting the class attribute.
 * @param blockClassName `className` of the root element
 * @param functionComponent
 * @returns Wrapped function.
 */
export function blockComponent<Props>(
  blockClassName: string | string[] | undefined,
  functionComponent: FuncComponent<Props>
): FuncComponent<Props> {
  // @ts-expect-error
  return ({ className, ...blockProps }: Props, ref) => {
    const baseClass = clsx(blockClassName, className);

    // @ts-expect-error
    return functionComponent({ className: baseClass, ...blockProps }, ref);
  };
}
