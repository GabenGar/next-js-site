import { formatNumber } from "#lib/number-formatter";
import { blockComponent } from "#components";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"span"> {
  number: number;
}

export const FancyUnit = blockComponent<Props>(
  styles.block,
  ({ number, ...blockProps }) => {
    return (
      <span data-value={number} {...blockProps}>
        {formatNumber(number)}
      </span>
    );
  }
);
