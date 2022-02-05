import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"section"> {}

const TemplateComponent = blockComponent<Props>(
  styles.block,
  ({ children, ...blockProps }) => {
    return <section {...blockProps}>{children}</section>;
  }
);
