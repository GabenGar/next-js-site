import { blockComponent } from "#components/meta";
import { useTranslation } from "next-i18next";

export const LoadingBar = blockComponent(undefined, Component);

function Component() {
  const { t } = useTranslation("components");
  return <div>{t("loading")}...</div>;
}
