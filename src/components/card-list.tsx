import { useState } from "react";
import { useClassName } from "#lib/hooks";
import styles from "./card-list.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLDivElement> {
}

const layouts = {
  mobile: styles.list_mobile
}

export function CardList({ children, className, ...blockProps }: Props) {
  const [layout, changeLayout] = useState(layouts.mobile);
  const blockClass = useClassName(styles.block, className);
  const listClass = useClassName(styles.list, layout);

  return (<div className={blockClass} {...blockProps}>
    <div className={listClass}>
      {children}
    </div>
  </div>);
}
