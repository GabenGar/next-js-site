import { blockComponent } from "#components/meta";
import { HTMLButton } from "#components/html/button";
import styles from "./_index.module.scss";

import type { HTMLButtonProps } from "#components/html/button";

export interface ButtonSubmitProps extends Omit<HTMLButtonProps, "type"> {}

export const ButtonSubmit = blockComponent<ButtonSubmitProps>(
  styles.submit,
  ({ children, ...blockProps }) => {
    return (
      <HTMLButton {...blockProps} type="submit">
        {children}
      </HTMLButton>
    );
  }
);
