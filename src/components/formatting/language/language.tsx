import { parseLangTag, getLangName } from "#lib/language";
import { blockComponent } from "#components/meta";
import styles from "./_index.module.scss";

import type { BlockProps } from "#types/props";
import type { BCPLangTag } from "#lib/language";

export interface ILanguageViewProps extends BlockProps<"p"> {
  isoCode: BCPLangTag;
}

export const LanguageView = blockComponent(
  styles.block,
  ({ isoCode, ...blockProps }: ILanguageViewProps) => {
    const { language } = parseLangTag(isoCode);

    return (
      <p {...blockProps}>
        <span className={styles.lang}>{language}</span>{" "}
        <span className={styles.region}>{getLangName(language!, true)}</span>
      </p>
    );
  }
);
