import { blockComponent } from "#components/meta";
import { Link } from "./base";
import styles from "./button.module.scss";

import type { ILinkProps } from "./base";

export interface ILinkButtonProps extends ILinkProps {}

export const LinkButton = blockComponent(styles.block, Component);

function Component({ children, ...blockProps }: ILinkButtonProps) {
  return <Link { ...blockProps }>{children}</Link>;
}
