import { blockComponent } from "#components/meta";
import { HTMLInput } from "#components/html/input";
import styles from "./_index.module.scss";

import type { HTMLInputProps } from "#components/html/input";

export interface InputTextProps extends Omit<HTMLInputProps, "type"> {}

export const InputText = blockComponent<InputTextProps>(
  styles.text,
  ({ ...blockProps }) => {
    return <HTMLInput {...blockProps} type="text" />;
  }
);
