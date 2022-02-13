import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface HTMLImgProps extends BlockProps<"img"> {}

export const HTMLImg = blockComponent<HTMLImgProps>(
  styles.block,
  ({ ...blockProps }) => {
    return <img {...blockProps} />;
  }
);
