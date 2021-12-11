import { blockComponent } from "#components";
import { InternalAnchour } from "#components/fancy/a";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"a"> {
  type: "external" | "internal" | "local";
}

export const FancyNav = blockComponent(
  styles.block,
  ({ children, ...blockProps }: Props) => {
    return (
      <InternalAnchour {...blockProps} href="/">
        {children}
      </InternalAnchour>
    );
  }
);
