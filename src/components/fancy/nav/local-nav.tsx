import { blockComponent } from "#components";
import { FancyNav, NavList, NavItem } from "./base";
import { LinkLocal } from "#components/links";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"nav"> {
  items: {
    title: string;
    id: string;
  }[];
}

export const LocalNav = blockComponent<Props>(
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
              <LinkLocal targetID={item.id}>{item.title}</LinkLocal>
            </NavItem>
          ))}
        </NavList>
      </FancyNav>
    );
  }
);
