import { blockComponent } from "#components/meta";
import { ButtonSubmit } from "./submit";
import styles from "./accept.module.scss";

import type { IButtonSubmitProps } from "./submit";

export interface IButtonAcceptProps extends IButtonSubmitProps {}

/**
 * Is a {@link ButtonSubmit submit button}, therefore the accept logic has to be handled on the parent form.
 */
export const ButtonAccept = blockComponent(styles.block, Component);

function Component({ children, ...blockProps }: IButtonAcceptProps) {
  return <ButtonSubmit {...blockProps}>{children}</ButtonSubmit>;
}
