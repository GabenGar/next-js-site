import { blockComponent } from "#components";
import { Anchour } from "#components/fancy/a";

import styles from "./_index.module.scss";

import type { AnchourProps } from "#components/fancy/a";

interface Props extends AnchourProps {
  href: string;
  isAffiliated: boolean;
}

export const LinkExternal = blockComponent<Props>(
  styles.block,
  ({
    href,
    isAffiliated = false,
    target = "_blank",
    rel = undefined,
    children,
    ...blockProps
  }) => {
    const relEx = isAffiliated
      ? "external noopener"
      : "external nofollow noopener noreferrer";
    return (
      <Anchour
        href={href}
        target={target}
        rel={`${rel} ${relEx}`}
        {...blockProps}
      >
        {children}
      </Anchour>
    );
  }
);
