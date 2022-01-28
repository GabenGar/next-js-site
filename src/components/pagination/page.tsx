import { blockComponent } from "#components/meta";
import { Button } from "#components/fancy";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/base-props";

interface Props extends BlockProps<"button"> {
  pageNumber?: number;
}

export const PageButton = blockComponent<Props>(
  styles.page,
  ({ pageNumber = undefined, ...blockProps }) => {
    return (
      <Button
        {...blockProps}
        value={pageNumber ? pageNumber : undefined}
        disabled={!pageNumber}
      >
        {pageNumber ? pageNumber : "..."}
      </Button>
    );
  }
);
