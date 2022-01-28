import { formatNumber } from "#lib/number-formatter";
import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"span"> {
  number: number;
}

export const FancyNumber = blockComponent<Props>(
  styles.block,
  ({ number, ...blockProps }) => {
    return (
      <span {...blockProps} data-value={number}>
        {formatNumber(number)}
      </span>
    );
  }
);
