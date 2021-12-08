import { blockComponent } from "#components";
import { FancyNav, NavList, NavItem } from "./base";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";
import { LocalAnchour } from "#components/fancy";

interface Props extends BlockProps<"nav"> {
  items: {
    title: string;
    id: string;
  }[];
}

export const GlobalNav = blockComponent<Props>(
  styles.block,
  ({ items, children, ...blockProps }) => {
    return (
      <FancyNav {...blockProps}>
        <NavList>
          <p className={styles.title}>
            {children ? children : "Table of Contents"}
          </p>
          {items.map((item) => (
            <NavItem key={item.id}>
              <LocalAnchour targetID={item.id}>{item.title}</LocalAnchour>
            </NavItem>
          ))}
        </NavList>
      </FancyNav>
    );
  }
);
