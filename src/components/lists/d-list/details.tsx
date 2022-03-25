import { useTranslation } from "next-i18next";
import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

export interface IDDetailsProps extends BlockProps<"dd"> {}

export const DDetails = blockComponent<IDDetailsProps>(
  styles.details,
  Component
);

function Component({ children, ...blockProps }: IDDetailsProps) {
  const { t } = useTranslation("components");
  return <dd {...blockProps}>{children ? children : t("dd_unknown")}</dd>;
}
