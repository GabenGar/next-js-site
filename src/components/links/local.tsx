import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"a"> {
  targetID: string;
}

export const LocalAnchour = blockComponent<Props>(
  styles.block,
  ({ targetID, children, ...blockProps }) => {
    return (
      <a {...blockProps} href={`#${targetID}`}>
        {children}
      </a>
    );
  }
);
