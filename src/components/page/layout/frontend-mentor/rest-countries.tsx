import { useEffect, useState } from "react";
import { ENV_VARS } from "#configs/public";
import {
  AVAILABLE_THEMES,
  defaultTheme,
  setCurrentTheme,
  getCurrentTheme,
} from "#lib/theme";
import { InternalAnchour, Button, Anchour } from "#components/fancy";
import styles from "./rest-countries.module.scss";

import { MouseEvent as RMouseEvent } from "react";
import type { RootlessProps } from "#types";

interface Props extends RootlessProps {}

const repoURL = `${ENV_VARS.REPOSITORY}/tree/fm-rest/src/pages/frontend-mentor/rest-countries`;

export function RESTCountries({ children }: Props) {
  const [currentTheme, switchCurrentTheme] = useState("");

  // doing this because nextjs server is upset over `document`
  useEffect(() => {
    switchCurrentTheme(() => getCurrentTheme());
  }, []);

  function switchTheme(event: RMouseEvent<HTMLButtonElement, MouseEvent>) {
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
              <InternalAnchour href="/">Home</InternalAnchour>
            </li>
            <li className={styles.item}>
              <InternalAnchour href="/frontend-mentor/rest-countries">
                REST Countries
              </InternalAnchour>
            </li>
            <li className={styles.item}>
              <InternalAnchour href="/frontend-mentor/rest-countries/all">
                All
              </InternalAnchour>
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
        <Anchour href={repoURL}>Source code</Anchour>
      </footer>
    </>
  );
}
