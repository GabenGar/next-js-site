import { blockComponent } from "#components";
import { Anchour } from "#components/fancy/a";
import styles from "./_index.module.scss";

import type { AnchourProps } from "#components/fancy/a";
interface Props extends AnchourProps {
  targetID: string;
}

export const LinkLocal = blockComponent<Props>(
  styles.block,
  ({ targetID, children, ...blockProps }) => {
    return (
      <Anchour {...blockProps} href={`#${targetID}`}>
        {children}
      </Anchour>
    );
  }
);
