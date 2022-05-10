import { blockComponent } from "#components/meta";
import { HTMLInput } from "#components/html/input";
import styles from "./_index.module.scss";

import type { IHTMLInputProps } from "#components/html/input";

export interface InputEmailProps extends IHTMLInputProps {}

export const InputEmail = blockComponent<InputEmailProps>(
  styles.text,
  ({ ...blockProps }) => {
    return <HTMLInput {...blockProps} type="email" />;
  }
);
