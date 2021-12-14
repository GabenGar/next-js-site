import { useEffect, useState } from "react";
import { ENV_VARS } from "#configs/public";
import {
  AVAILABLE_THEMES,
  defaultTheme,
  setCurrentTheme,
  getCurrentTheme,
} from "#lib/theme";
import { Button } from "#components/fancy";
import { LinkInternal, LinkExternal } from "#components/links";
import styles from "./rest-countries.module.scss";

import type { RootlessProps } from "#types";
import type { ButtonClickEvent } from "#components/fancy";

interface Props extends RootlessProps {}

const repoURL = `${ENV_VARS.REPOSITORY}/tree/master/src/pages/frontend-mentor/rest-countries`;

export function RESTCountries({ children }: Props) {
  const [currentTheme, switchCurrentTheme] = useState("");

  // doing this because nextjs server is upset over `document`
  useEffect(() => {
    switchCurrentTheme(() => getCurrentTheme());
  }, []);

  function switchTheme(event: ButtonClickEvent) {
    const nextTheme =
      currentTheme === AVAILABLE_THEMES.DARK
        ? AVAILABLE_THEMES.LIGHT
        : AVAILABLE_THEMES.DARK;

    switchCurrentTheme(() => nextTheme);
    setCurrentTheme(nextTheme);
  }

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <LinkInternal href="/">Home</LinkInternal>
            </li>
            <li className={styles.item}>
              <LinkInternal href="/frontend-mentor/rest-countries">
                REST Countries
              </LinkInternal>
            </li>
            <li className={styles.item}>
              <LinkInternal href="/frontend-mentor/rest-countries/all">
                All
              </LinkInternal>
            </li>
          </ul>
        </nav>
        <Button onClick={switchTheme}>
          {currentTheme === AVAILABLE_THEMES.LIGHT
            ? AVAILABLE_THEMES.DARK
            : AVAILABLE_THEMES.LIGHT}
        </Button>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <LinkExternal href={repoURL}>Source code</LinkExternal>
      </footer>
    </>
  );
}
