import { useEffect, useState } from "react";
import {
  AVAILABLE_THEMES,
  defaultTheme,
  setCurrentTheme,
  getCurrentTheme,
} from "#lib/theme";
import { Anchour, Button, InternalAnchour } from "#components/fancy";
import { FancyNav, NavList, NavItem } from "#components/fancy/nav";
import styles from "./base.module.scss";

import type { RootlessProps } from "#types";
import type { ButtonClickEvent } from "#components/fancy";
import { ENV_VARS } from "#configs/public";

interface Props extends RootlessProps {}

export function BaseLayout({ children }: Props) {
  const [currentTheme, switchCurrentTheme] = useState("");

  useEffect(() => {
    switchCurrentTheme(() => getCurrentTheme());
  });

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
        <FancyNav className={styles.nav}>
          <NavList>
            <NavItem>
              <InternalAnchour href="/">Home</InternalAnchour>
            </NavItem>
          </NavList>
        </FancyNav>
        <Button className={styles.switch} onClick={switchTheme}>
          {currentTheme === AVAILABLE_THEMES.LIGHT
            ? AVAILABLE_THEMES.DARK
            : AVAILABLE_THEMES.LIGHT}
        </Button>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <FancyNav className={styles.nav}>
          <NavList>
            <NavItem>
              <Anchour href={ENV_VARS.REPOSITORY}>Source code</Anchour>
            </NavItem>
          </NavList>
        </FancyNav>
      </footer>
    </>
  );
}
