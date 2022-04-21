import { blockComponent } from "#components/meta";
import { ButtonSubmit } from "./submit";
import styles from "./accept.module.scss";

import type { IButtonSubmitProps } from "./submit";

export interface IButtonAcceptProps extends IButtonSubmitProps {
  /**
   * The same behaviour as [`form` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-form).
   */
  formID?: string;
}

export const ButtonAccept = blockComponent(styles.block, Component);

function Component({ children, ...blockProps }: IButtonAcceptProps) {
  return <ButtonSubmit {...blockProps}>{children}</ButtonSubmit>;
}
