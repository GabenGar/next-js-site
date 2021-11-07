import { Children, isValidElement } from "react";
import type { ReactNode, ReactElement } from "react";

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 * @link https://github.com/chakra-ui/chakra-ui/blob/main/packages/react-utils/src/children.ts
 * @param children The children.
 */
export function getValidChildren(children: ReactNode) {
  return Children.toArray(children).filter((child) =>
    isValidElement(child)
  ) as ReactElement[];
}
