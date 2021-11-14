import { useClassName } from "#lib/hooks";
import styles from "./_index.module.scss";

import type { DivProps } from "#types";

interface Props extends DivProps {
  type?: string;
  layout?: string;
}

export const listTypes = {
  vertical: styles.list_vertical,
  horizontal: styles.list_horizontal,
};

export const listLayouts = {
  feature: styles.list_feature,
  mobile: styles.list_mobile,
  phone: styles.list_phone,
};

export function ItemList({
  type = listTypes.vertical,
  layout = listLayouts.mobile,
  children,
  className,
  ...blockProps
}: Props) {
  const blockClass = useClassName(styles.list, type, layout);

  return (
    <div className={blockClass} {...blockProps}>
      {children}
    </div>
  );
}
