import { blockComponent } from "#components/meta";
import { guessLinkType } from "./lib";
import { LinkExternal } from "./external";
import { LinkInternal } from "./internal";
import { LinkLocal } from "./local";
import styles from "./_index.module.scss";

import type { AnchourProps } from "#components/fancy/a";

export const linkTypes = {
  external: { name: "external", component: LinkExternal },
  internal: { name: "internal", component: LinkInternal },
  local: { name: "local", component: LinkLocal },
};

export interface LinkProps extends AnchourProps {
  href: string;
  type?: keyof typeof linkTypes;
}

export const Link = blockComponent<LinkProps>(
  styles.block,
  ({ type = "external", href, children, ...blockProps }) => {
    // const guessedType = guessLinkType(href);
    // @ts-expect-error TODO: type later
    return linkTypes[type].component({ href, children, ...blockProps });
  }
);
