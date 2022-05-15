import { useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { setCookie } from "#browser/store/cookie-store";
import { blockComponent } from "#components/meta";
import { List, ListItem } from "#components/lists";
import { Button } from "#components/buttons";
import { LinkInternal } from "#components/links";
import { LanguageView } from "./language";
import styles from "./switcher.module.scss";

import type { ISOLangString } from "#lib/language";
import type { BlockProps } from "#types/props";

export interface ILanguageSwitcherProps extends BlockProps<"div"> {}

export const LanguageSwitcher = blockComponent(styles.block, Switcher);

function Switcher({ ...blockProps }: ILanguageSwitcherProps) {
  const router = useRouter();
  const [isOpen, switchPanel] = useState(false);
  const { locales, locale: activeLocale } = router;

  return (
    <div
      {...blockProps}
      // onBlur={() => {
      //   switchPanel(false);
      // }}
    >
      <Button
        className={styles.lang}
        onClick={() => {
          switchPanel(!isOpen);
        }}
      >
        {activeLocale}
      </Button>
      <List className={clsx(styles.list, isOpen && styles.list_open)}>
        {locales!.map((locale) => {
          const { pathname, query, asPath } = router;
          const isCurrentLocale = locale === activeLocale;

          return (
            <ListItem key={locale}>
              {isCurrentLocale ? (
                <LanguageView langString={locale} />
              ) : (
                <LinkInternal
                  href={{ pathname, query }}
                  as={asPath}
                  locale={locale}
                  onClick={() => {
                    setCookie("NEXT_LOCALE", locale);
                  }}
                >
                  <LanguageView langString={locale} />
                </LinkInternal>
              )}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
