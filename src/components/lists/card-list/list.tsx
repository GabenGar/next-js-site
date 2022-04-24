import clsx from "clsx";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export const listLayoutKeys = ["feature", "mobile", "phone", "tablet"] as const;
export type IListLayout = typeof listLayoutKeys[number];

interface Props extends BlockProps<"div"> {
  type?: string;
  layout?: IListLayout;
}

export const listTypes = {
  vertical: styles.list_vertical,
  horizontal: styles.list_horizontal,
};

export const listLayouts: Record<IListLayout, string> = {
  feature: styles.list_feature,
  mobile: styles.list_mobile,
  phone: styles.list_phone,
  tablet: styles.list_tablet,
};

export function ItemList({
  type = listTypes.vertical,
  layout = "mobile",
  children,
  className,
  ...blockProps
}: Props) {
  const blockClass = clsx(styles.list, type, styles[`list_${layout}`]);

  return (
    <div className={blockClass} {...blockProps}>
      {children}
    </div>
  );
}
