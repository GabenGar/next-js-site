import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { ElementProps } from "#types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ElementProps<HTMLFormElement> {
  currentPage: number
}

export function CurrentPage({ currentPage, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.page, styles.currentPage, className);

  return (<form
    className={blockClass} {...blockProps}
  >
    {currentPage}
  </form>);
}
