import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"a"> {
  href: string;
}

export const Anchour = blockComponent<Props>(
  styles.block,
  ({
    href,
    target = "_blank",
    rel = "noreferrer",
    children,
    ...blockProps
  }) => {
    return (
      <a href={href} target={target} rel={rel} {...blockProps}>
        {children}
      </a>
    );
  }
);
