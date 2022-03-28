import { forwardRef } from "react";
import { blockComponent } from "#components/meta";
import { SVGIcon } from "#components/icons";
import styles from "./base.module.scss";

import type { LegacyRef } from "react";
import type { BlockProps } from "#types/props";

export interface IHTMLAProps extends BlockProps<"a"> {
  iconID?: string;
}

export const HTMLA = forwardRef<HTMLAnchorElement, IHTMLAProps>(
  blockComponent<IHTMLAProps>(styles.block, Component)
);

function Component(
  { iconID, href, children, ...htmlaProps }: IHTMLAProps,
  ref?: LegacyRef<HTMLAnchorElement>
) {
  return (
    <a href={href} {...htmlaProps} ref={ref}>
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
