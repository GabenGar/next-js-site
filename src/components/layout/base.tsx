import { useEffect, useState } from "react";
import { REPOSITORY } from "#environment/vars";
import {
  AVAILABLE_THEMES,
  defaultTheme,
  setCurrentTheme,
  getCurrentTheme,
} from "#lib/theme";
import { SVGIcon } from "#components/icons";
import { Button } from "#components/fancy";
import { LinkExternal, LinkInternal } from "#components/links";
import { FancyNav, NavList, NavItem } from "#components/fancy/nav";
import styles from "./base.module.scss";

import type { RootlessProps } from "#types/props";
import type { ButtonClickEvent } from "#components/fancy";

interface Props extends RootlessProps {}

export function BaseLayout({ children }: Props) {
  // const [currentTheme, switchCurrentTheme] = useState("");

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
        <FancyNav className={styles.nav}>
          <NavList>
            <NavItem>
              <LinkInternal href="/" className={styles.navLink}>
                <SVGIcon iconID="react" />
                <span>Home</span>
              </LinkInternal>
            </NavItem>
          </NavList>
        </FancyNav>
        {/* <Button className={styles.switch} onClick={switchTheme}>
          <SVGIcon iconID="adjust" />
          <span>
            {currentTheme === AVAILABLE_THEMES.LIGHT
              ? AVAILABLE_THEMES.DARK
              : AVAILABLE_THEMES.LIGHT}
          </span>
        </Button> */}
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <FancyNav className={styles.nav}>
          <NavList>
            <NavItem>
              <LinkExternal href={REPOSITORY} className={styles.navLink}>
                <SVGIcon iconID="github" />
                <span>Source code</span>
              </LinkExternal>
            </NavItem>
          </NavList>
        </FancyNav>
      </footer>
    </>
  );
}
