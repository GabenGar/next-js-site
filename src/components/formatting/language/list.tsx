import { blockComponent } from "#components/meta";
import { List } from "#components/lists";
import { LanguageView } from "./language";
import styles from "./_index.module.scss";

import type { BCPLangTag } from "#lib/language";
import type { IListProps } from "#components/lists";

export interface ILanguageListProps extends IListProps {
  langStrings: BCPLangTag[];
}

export const LanguageList = blockComponent(
  styles.block,
  ({ langStrings, ...blockProps }: ILanguageListProps) => {
    return (
      <List {...blockProps}>
        {langStrings.map((langString) => (
          <LanguageView key={langString} langString={langString} />
        ))}
      </List>
    );
  }
);
