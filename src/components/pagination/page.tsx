import { useClassName } from "#lib/hooks";
import { Button } from "#components/fancy";
import styles from "./_index.module.scss";

import type { ElementProps } from "#types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ElementProps<HTMLButtonElement> {
  pageNumber?: number;
}

export function PageButton({
  pageNumber = undefined,
  className,
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.page, className);
  return (
    <Button
      className={blockClass}
      {...blockProps}
      value={pageNumber ? pageNumber : undefined}
      disabled={!pageNumber}
    >
      {pageNumber ? pageNumber : "..."}
    </Button>
  );
}
