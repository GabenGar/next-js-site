import { useTranslation } from "next-i18next";
import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";

interface Props extends BlockProps<"section"> {}

const TemplateComponent = blockComponent<Props>(styles.block, Component);

function Component({ children, ...blockProps }: Props) {
  const { t } = useTranslation("components");
  return <section {...blockProps}>{children}</section>;
}
