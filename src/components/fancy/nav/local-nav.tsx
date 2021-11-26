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

export const LocalNav = blockComponent<Props>(
  styles.block,
  ({ items, ...blockProps }) => {
    return (
      <FancyNav {...blockProps}>
        <NavList>
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
