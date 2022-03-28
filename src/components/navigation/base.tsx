import { blockComponent } from "#components/meta";
import { HTMLNav } from "#components/html/nav";
import { List, ListItem } from "#components/lists";
import styles from "./_index.module.scss";

import type { HTMLNavProps } from "#components/html/nav";
import type { IListProps, IListItemProps } from "#components/lists";

export interface INavProps extends HTMLNavProps {}

export interface INavListProps extends IListProps {}

export interface INavItemProps extends IListItemProps {}

export const Nav = blockComponent<INavProps>(styles.block, NavComponent);

export const NavList = blockComponent<INavListProps>(
  styles.list,
  NavListComponent
);

export const NavItem = blockComponent<INavItemProps>(
  styles.item,
  NavItemComponent
);

function NavComponent({ children, ...blockProps }: HTMLNavProps) {
  return <HTMLNav {...blockProps}>{children}</HTMLNav>;
}

function NavListComponent({ children, ...blockProps }: INavListProps) {
  return <List {...blockProps}>{children}</List>;
}

function NavItemComponent({ children, ...blockProps }: INavItemProps) {
  return <ListItem {...blockProps}>{children}</ListItem>;
}
