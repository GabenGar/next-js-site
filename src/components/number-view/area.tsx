import { formatArea } from "#lib/number-formatter";
import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types";

interface Props extends BlockProps<"span"> {
  number: number;
}

export const FancyArea = blockComponent<Props>(
  styles.block,
  ({ number, ...blockProps }) => {
    return (
      <span data-value={number} {...blockProps}>
        {formatArea(number)}
        <sup>2</sup>
      </span>
    );
  }
);
