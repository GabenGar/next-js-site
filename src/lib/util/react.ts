import { Children, isValidElement, cloneElement } from "react";
import type { ReactNode, ReactElement, PropsWithChildren } from "react";

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 * @link https://github.com/chakra-ui/chakra-ui/blob/main/packages/react-utils/src/children.ts
 * @param children The `children` elements.
 */
export function getValidChildren(children: ReactNode) {
  return Children.toArray(children).filter((child) =>
    isValidElement(child)
  ) as ReactElement[];
}

interface NewProps {
  className: string;
}

/**
 * Transforms props on `children` components.
 * `className` property gets concatenated instead.
 */
export function transformChildrenProps<N>(
  { children }: PropsWithChildren<{}>,
  { className, ...props }: N & NewProps,
) {
  // store `children in an array`
  const newChildren = Children.toArray(children).reduce<ReactElement[]>(
    (prev, current) => {
      if (isValidElement(current)) {
        const newElement = cloneElement(current, {
          ...current.props,
          className: useClassList(current.props.className, className),
          ...props,
        });

        prev.push(newElement);
      }
      return prev;
    },
    []
  );

  return newChildren;
}

export function useClassList(...classNames: Array<string | undefined>): string {
  if (!classNames.length) {
    return "";
  }

  if (classNames.length === 1 && classNames[0]) {
    return classNames[0];
  }

  return classNames.join(" ");
}
