import { useEffect, useState } from "react";
import { REPOSITORY } from "#environment/vars";
import {
  AVAILABLE_THEMES,
} from "#lib/theme";
import { Button } from "#components/fancy";
import { LinkInternal, LinkExternal } from "#components/links";
import { SVGIcon } from "#components/icons";
import styles from "./rest-countries.module.scss";

import type { RootlessProps } from "#types/props";
import type { ButtonClickEvent } from "#components/fancy";

interface Props extends RootlessProps {}

const repoURL = `${REPOSITORY}/tree/master/src/pages/frontend-mentor/rest-countries`;

export function RESTCountries({ children }: Props) {
  // const [currentTheme, switchCurrentTheme] = useState("");

  // doing this because nextjs server is upset over `document`
  // useEffect(() => {
  //   switchCurrentTheme(() => getCurrentTheme());
  // }, []);

  // function switchTheme(event: ButtonClickEvent) {
  //   const nextTheme =
  //     currentTheme === AVAILABLE_THEMES.DARK
  //       ? AVAILABLE_THEMES.LIGHT
  //       : AVAILABLE_THEMES.DARK;

  //   switchCurrentTheme(() => nextTheme);
  //   setCurrentTheme(nextTheme);
  // }

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
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <LinkExternal className={styles.navLink} href={repoURL}>
          <SVGIcon iconID="github" />
          <span>Source code</span>
        </LinkExternal>
      </footer>
    </>
  );
}
