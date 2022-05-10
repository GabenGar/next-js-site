import { forwardRef } from "react";
import { blockComponent } from "#components/meta";
import { SVGIcon } from "#components/icons";
import styles from "./base.module.scss";

import type { LegacyRef } from "react";
import type { BlockProps } from "#types/props";
import type { ISVGIconProps} from "#components/icons";

export interface IHTMLAProps extends Omit<BlockProps<"a">, "href"> {
  iconID?: ISVGIconProps["iconID"];
  href: string | URL;
}

export const HTMLA = forwardRef<HTMLAnchorElement, IHTMLAProps>(
  blockComponent<IHTMLAProps>(styles.block, Component)
);

function Component(
  { iconID, href, children, ...htmlaProps }: IHTMLAProps,
  ref?: LegacyRef<HTMLAnchorElement>
) {
  return (
    <a
      href={href instanceof URL ? href.toString() : href}
      {...htmlaProps}
      ref={ref}
    >
      {iconID ? (
        <>
          <SVGIcon iconID={iconID} /> <span>{children}</span>
        </>
      ) : (
        children
      )}
    </a>
  );
}
