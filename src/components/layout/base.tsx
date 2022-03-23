import clsx from "clsx";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { REPOSITORY, EMAIL_ADDRESS } from "#environment/vars";
import {
  AVAILABLE_THEMES,
  defaultTheme,
  setCurrentTheme,
  getCurrentTheme,
} from "#lib/theme";
import { useAccount } from "#lib/hooks";
import { SVGIcon } from "#components/icons";
import { Button } from "#components/fancy";
import { LinkExternal, LinkInternal, LinkEmail } from "#components/links";
import { FancyNav, NavList, NavItem } from "#components/fancy/nav";
import { Form } from "#components/forms";
import { ButtonSubmit } from "#components/buttons";
import styles from "./base.module.scss";

import type { FocusEvent } from "react";
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
          <NavList className={styles.list}>
            <NavItem>
              <LinkInternal href="/" className={styles.navLink}>
                <SVGIcon iconID="react" />
                <span>Home</span>
              </LinkInternal>
            </NavItem>
            <NavItem>
              <LinkInternal href="/blog" className={styles.navLink}>
                <SVGIcon iconID="blog" />
                <span>Blog</span>
              </LinkInternal>
            </NavItem>
            <NavItem>
              <LinkInternal href="/about" className={styles.navLink}>
                <SVGIcon iconID="biohazard" />
                <span>About</span>
              </LinkInternal>
            </NavItem>
            <AccountNav />
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
        <address className={styles.contacts}>
          Contacts:
          <br />
          <LinkEmail email={EMAIL_ADDRESS}>Email</LinkEmail>
        </address>
      </footer>
    </>
  );
}

function AccountNav() {
  const router = useRouter();
  const { account, isLoading } = useAccount();
  const [isOpen, changeOpen] = useState(false);
  const isLoggedIn = Boolean(!isLoading && account);
  const { locale, defaultLocale } = router;

  function handleClosing(event: FocusEvent<HTMLLIElement>) {
    
  }

  return (
    <NavItem onBlur={handleClosing}
      className={clsx(
        styles.account,
        isLoading && styles.account_loading,
        isOpen && styles.account_open
      )}
    >
      <Button
        className={styles.button}
        onClick={() => {
          changeOpen(!isOpen);
        }}
      >
        <SVGIcon iconID="user-circle" />
        <span>Account</span>
      </Button>
      <NavList className={clsx(styles.list)}>
        {isLoggedIn ? (
          <>
            <NavItem>
              <Language isoCode={locale ?? defaultLocale!} />
            </NavItem>
            <NavItem>
              <LinkInternal href="/account" className={styles.navLink}>
                <span>Information</span>
                <SVGIcon iconID="address-card" />
              </LinkInternal>
            </NavItem>
            <NavItem>
              <Form
                className={styles.logout}
                method="POST"
                action="/auth/logout"
                submitButton={
                  <ButtonSubmit className={styles.button}>
                    <span>Logout</span>
                    <SVGIcon iconID="sign-out-alt" />
                  </ButtonSubmit>
                }
              />
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <LinkInternal href="/auth/register" className={styles.navLink}>
                <span>Register</span>
                <SVGIcon iconID="user-plus" />
              </LinkInternal>
            </NavItem>
            <NavItem>
              <LinkInternal href="/auth/login" className={styles.navLink}>
                <span>Login</span>
                <SVGIcon iconID="sign-in-alt" />
              </LinkInternal>
            </NavItem>
          </>
        )}
      </NavList>
    </NavItem>
  );
}

function Language({ isoCode }: { isoCode: string }) {
  return <span>{isoCode}</span>;
}
