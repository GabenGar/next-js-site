import { blockComponent } from "#components/meta";
import { Nav, NavList, NavItem } from "./base";
import { LinkInternal } from "#components/links";
import styles from "./internal.module.scss";

import type { ILinkInternalProps } from "#components/links";
import type { INavProps, INavListProps, INavItemProps } from "./base";

export interface INavList {
  isOrdered?: boolean;
  navItems?: INavItem[];
}

export interface INavItem {
  iconID?: string;
  link: string;
  title: string;
}

export interface IInternalNavProps extends INavProps {
  navLists?: INavList[];
}

export interface IInternalNavListProps extends INavListProps {
  navItems?: INavItem[];
}

export interface IInternalNavItemProps extends INavItemProps {
  navItem?: INavItem;
}

export interface IInternalNavLinkProps extends ILinkInternalProps {}

export const InternalNav = blockComponent<IInternalNavProps>(
  styles.block,
  NavComponent
);
export const InternalNavList = blockComponent<IInternalNavListProps>(
  styles.list,
  NavListComponent
);
export const InternalNavItem = blockComponent<IInternalNavItemProps>(
  styles.item,
  NavItemComponent
);
export const InternalNavLink = blockComponent<IInternalNavLinkProps>(
  styles.link,
  NavLinkComponent
);

function NavComponent({
  navLists,
  children,
  ...blockProps
}: IInternalNavProps) {
  return (
    <Nav {...blockProps}>
      {!navLists?.length
        ? children
        : navLists.map(({ isOrdered, navItems }, index) => (
            <InternalNavList
              key={index}
              isOrdered={isOrdered}
              navItems={navItems}
            />
          ))}
    </Nav>
  );
}

function NavListComponent({
  navItems,
  children,
  ...blockProps
}: IInternalNavListProps) {
  return (
    <NavList {...blockProps}>
      {!navItems?.length
        ? children
        : navItems.map((navItem, index) => {
            const { link, title } = navItem;
            return (
              <InternalNavItem key={link + title + index} navItem={navItem} />
            );
          })}
    </NavList>
  );
}

function NavItemComponent({
  navItem,
  children,
  ...blockProps
}: IInternalNavItemProps) {
  return (
    <NavItem {...blockProps}>
      {!navItem ? (
        children
      ) : (
        <InternalNavLink href={navItem.link} iconID={navItem.iconID}>
          {navItem.title}
        </InternalNavLink>
      )}
    </NavItem>
  );
}

function NavLinkComponent({ children, ...blockProps }: IInternalNavLinkProps) {
  return <LinkInternal {...blockProps}>{children}</LinkInternal>;
}
