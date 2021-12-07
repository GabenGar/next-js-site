import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"nav"> {}
interface ListProps extends BlockProps<"ul"> {}
interface ItemProps extends BlockProps<"li"> {}

export const FancyNav = blockComponent(
  styles.block,
  ({ children, ...blockProps }: Props) => {
    return <nav {...blockProps}>{children}</nav>;
  }
);

export const NavList = blockComponent(
  styles.list,
  ({ children, ...blockProps }: ListProps) => {
    return <ul {...blockProps}>{children}</ul>;
  }
);

export const NavItem = blockComponent(
  styles.item,
  ({ children, ...blockProps }: ItemProps) => {
    return <li {...blockProps}>{children}</li>;
  }
);
