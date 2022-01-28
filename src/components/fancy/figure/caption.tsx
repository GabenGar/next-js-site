import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/base-props";

export interface IFigCaptionProps extends BlockProps<"figcaption"> {}

export const FigCaption = blockComponent<IFigCaptionProps>(
  styles.caption,
  ({ children, ...blockProps }) => {
    return <figcaption {...blockProps}>{children}</figcaption>;
  }
);
