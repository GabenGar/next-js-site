import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"dl"> {}

export const DescriptionList = blockComponent<Props>(
  styles.block,
  ({ children, ...blockProps }) => {
    return <dl {...blockProps}>{children}</dl>;
  }
);
