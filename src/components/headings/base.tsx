import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";
const headingLevels = [1, 2, 3, 4, 5, 6] as const;
export type HeadingLevel = typeof headingLevels[number];

export interface HeadingProps
  extends BlockProps<"h1">,
    BlockProps<"h2">,
    BlockProps<"h3">,
    BlockProps<"h4">,
    BlockProps<"h5">,
    BlockProps<"h6"> {
  level?: HeadingLevel;
}

export const Heading = blockComponent<HeadingProps>(
  styles.block,
  ({ level = 2, children, ...blockProps }) => {
    switch (level) {
      case 1:
        return <h1 {...blockProps}>{children}</h1>;
      case 2:
        return <h2 {...blockProps}>{children}</h2>;
      case 3:
        return <h3 {...blockProps}>{children}</h3>;
      case 4:
        return <h4 {...blockProps}>{children}</h4>;
      case 5:
        return <h5 {...blockProps}>{children}</h5>;
      case 6:
        return <h6 {...blockProps}>{children}</h6>;

      default:
        throw Error("Unknown heading error.");
    }
  }
);
