import { blockComponent } from "#components/meta";
import { HTMLButton } from "#components/html/button";
import styles from "./_index.module.scss";

import type { HTMLButtonProps } from "#components/html/button";

export interface ButtonProps extends Omit<HTMLButtonProps, "type"> {}

export const Button = blockComponent<ButtonProps>(styles.button, Component);

function Component({ children, ...blockProps }: ButtonProps) {
  return (
    <HTMLButton {...blockProps} type="button">
      {children}
    </HTMLButton>
  );
}
