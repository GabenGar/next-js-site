import { blockComponent } from "#components/meta";
import { HTMLA } from "#components/html/a";

import styles from "./_index.module.scss";

import type { HTMLAProps } from "#components/html/a";

export interface LinkExternalProps extends HTMLAProps {
  isAffiliated?: boolean;
}

export const LinkExternal = blockComponent<LinkExternalProps>(
  styles.block,
  ({
    href,
    isAffiliated = false,
    target = "_blank",
    children,
    ...blockProps
  }) => {
    const relEx = isAffiliated
      ? "external noopener"
      : "external nofollow noopener noreferrer";
    return (
      <HTMLA
        href={href}
        target={target}
        {...blockProps}
        rel={relEx}
      >
        {children}
      </HTMLA>
    );
  }
);
