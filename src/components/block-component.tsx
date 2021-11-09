import type { ComponentPropsWithoutRef } from "react";

interface BlockProps extends ComponentPropsWithoutRef<"div"> {}

interface ReactComponent {
  ({}: BlockProps): JSX.Element
}

export function blockComponent(functionComponent: ReactComponent) {
  return function () {
    return functionComponent({});
  };
}
