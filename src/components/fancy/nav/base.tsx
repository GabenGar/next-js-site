import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"nav"> {}
export interface NavListProps extends BlockProps<"ul"> {}
interface ItemProps extends BlockProps<"li"> {}

export const FancyNav = blockComponent<Props>(
  styles.block,
  ({ children, ...blockProps }) => {
    return <nav {...blockProps}>{children}</nav>;
  }
);

export const NavList = blockComponent<NavListProps>(
  styles.list,
  ({ children, ...blockProps }) => {
    return <ul {...blockProps}>{children}</ul>;
  }
);

export const NavItem = blockComponent<ItemProps>(
  styles.item,
  ({ children, ...blockProps }) => {
    return <li {...blockProps}>{children}</li>;
  }
);
