import { blockComponent } from "#components/meta";
import { guessLinkType } from "./lib";
import { linkTypes } from "./types";
import styles from "./_index.module.scss";

import type { AnchourProps } from "#components/fancy/a";

export interface LinkProps extends AnchourProps {
  href: string;
  type?: keyof typeof linkTypes;
}

export const FancyLink = blockComponent<LinkProps>(
  styles.block,
  ({ type = "external", href, children, ...blockProps }) => {
    // const guessedType = guessLinkType(href);
    // @ts-expect-error TODO: type later
    return linkTypes[type].component({ href, children, ...blockProps });
  }
);
