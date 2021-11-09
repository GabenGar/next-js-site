import { formatNumber } from "#lib/number-formatter";
import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { BaseProps } from "#types";

interface Props extends BaseProps {
  number: number;
}

export function FancyUnit({ number, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);
  return (
    <span data-value={number} className={blockClass} {...blockProps}>
      {formatNumber(number)}
    </span>
  );
}
