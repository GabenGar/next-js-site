import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

const anchourTypes = {
  external: "external",
  internal: "internal",
  local: "local"
}

interface Props extends BlockProps<"a"> {
  href: string
  type: keyof typeof anchourTypes
}

export const Anchour = blockComponent<Props>(
  styles.block,
  ({
    type = anchourTypes.external,
    href,
    children,
    ...blockProps
  }) => {
    return (
      <a href={href} {...blockProps}>
        {children}
      </a>
    );
  }
);
