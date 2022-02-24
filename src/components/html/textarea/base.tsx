import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface IHTMLTextAreaProps extends BlockProps<"textarea"> { }

export const HTMLTextArea = blockComponent<IHTMLTextAreaProps>(
  styles.block,
  ({ ...blockProps }) => {
    return (<textarea {...blockProps} />);
  }
)