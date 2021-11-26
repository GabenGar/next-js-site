import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"section"> {}

const TemplateComponent = blockComponent<Props>(
  styles.block,
  ({ children, className, ...blockProps }) => {
    return <section {...blockProps}>{children}</section>;
  }
);
