import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/base-props";

interface Props extends BlockProps<"dl"> {}

export const DescriptionList = blockComponent<Props>(
  styles.block,
  ({ children, ...blockProps }) => {
    return <dl {...blockProps}>{children}</dl>;
  }
);
