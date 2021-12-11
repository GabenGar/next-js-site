import { blockComponent } from "#components";
import { linkTypes } from "./types";
import styles from "./_index.module.scss";

import type { AnchourProps } from "#components/fancy/a";
import { guessLinkType } from "./lib";

interface Props extends AnchourProps {
  href: string;
  type?: keyof typeof linkTypes;
}

export const FancyLink = blockComponent<Props>(
  styles.block,
  ({ type = "external", href, children, ...blockProps }) => {
    const guessedType = guessLinkType(href);
    // @ts-expect-error TODO: type later
    return linkTypes[type].component({ href, children, ...blockProps });
  }
);
