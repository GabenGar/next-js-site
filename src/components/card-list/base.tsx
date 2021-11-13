import { useState } from "react";
import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { BaseProps } from "#types";

interface Props extends BaseProps {
  isGallery?: boolean;
}

const layouts = {
  mobile: styles.list_mobile,
};

export function CardList({
  isGallery = undefined,
  children,
  className,
  ...blockProps
}: Props) {
  const [layout, changeLayout] = useState(layouts.mobile);
  const blockClass = useClassName(styles.block, className);
  const listClass = useClassName(
    styles.list,
    layout,
    isGallery ? styles.list_gallery : undefined
  );

  return (
    <div className={blockClass} {...blockProps}>
      <div className={listClass}>{children}</div>
    </div>
  );
}
