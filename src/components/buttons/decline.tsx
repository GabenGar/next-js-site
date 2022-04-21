import { blockComponent } from "#components/meta";
import { Button } from "./button";
import styles from "./decline.module.scss";

import type { ButtonProps } from "./button";

export interface IButtonDeclineProps extends ButtonProps {}

export const ButtonDecline = blockComponent(styles.block, Component);

function Component({ children, ...blockProps }: IButtonDeclineProps) {
  return <Button {...blockProps}>{children}</Button>;
}
