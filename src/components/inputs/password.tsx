import { blockComponent } from "#components/meta";
import { HTMLInput } from "#components/html/input";
import styles from "./_index.module.scss";

import type { IHTMLInputProps } from "#components/html/input";

export interface InputPasswordProps extends IHTMLInputProps {
  isNew?: boolean;
}

export const InputPassword = blockComponent<InputPasswordProps>(
  styles.password,
  ({ isNew = true, autoComplete, type = "password", ...blockProps }) => {
    return (
      <HTMLInput
        type={type}
        autoComplete={isNew ? "new-password" : "current-password"}
        {...blockProps}
      />
    );
  }
);
