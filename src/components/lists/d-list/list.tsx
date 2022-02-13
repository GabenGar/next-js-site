import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface IDListProps extends BlockProps<"dl"> {}

export const DList = blockComponent<IDListProps>(
  styles.block,
  ({ children, ...blockProps }) => {
    return <dl {...blockProps}>{children}</dl>;
  }
);
