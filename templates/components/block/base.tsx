import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/base-props";

interface Props extends BlockProps<"section"> {}

const TemplateComponent = blockComponent<Props>(
  styles.block,
  ({ children, className, ...blockProps }) => {
    return <section {...blockProps}>{children}</section>;
  }
);
