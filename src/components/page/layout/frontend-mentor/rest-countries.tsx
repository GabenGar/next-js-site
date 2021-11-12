import { useEffect, useState } from "react";
import { CONSTANTS, ENV_VARS } from "#configs/public";
import { LocalAnchour, Button, Anchour } from "#components/fancy";
import styles from "./rest-countries.module.scss";

import { MouseEvent as RMouseEvent } from "react";
import type { RootlessProps } from "#types";

interface Props extends RootlessProps {}

const { THEMES } = CONSTANTS;

export function RESTCountries({ children }: Props) {
  const [currentTheme, switchCurrentTheme] = useState("");

  // doing this because nextjs server is upset over `document`
  useEffect(() => {
    switchCurrentTheme(document.documentElement.dataset.theme!);
  }, []);

  function switchTheme(event: RMouseEvent<HTMLButtonElement, MouseEvent>) {
    const nextTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

    document.documentElement.dataset.theme = nextTheme;
    switchCurrentTheme(nextTheme);
  }

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <LocalAnchour href="/">Home</LocalAnchour>
            </li>
            <li className={styles.item}>
              <LocalAnchour href="/frontend-mentor/rest-countries">
                REST Countries
              </LocalAnchour>
            </li>
            <li className={styles.item}>
              <LocalAnchour href="/frontend-mentor/rest-countries/all">
                All
              </LocalAnchour>
            </li>
          </ul>
        </nav>
        <Button onClick={switchTheme}>{currentTheme}</Button>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <Anchour href={ENV_VARS.REPOSITORY}>Source code</Anchour>
      </footer>
    </>
  );
}
