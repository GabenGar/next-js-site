import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { defaultNamespaces } from "./types";

export async function getServerSideTranslations(
  locale: string,
  extraNamespaces?: string[]
) {
  const localization = await serverSideTranslations(
    locale,
    // @ts-expect-error string stuff
    extraNamespaces ? defaultNamespaces.concat(extraNamespaces): defaultNamespaces
  );
  return localization;
}
