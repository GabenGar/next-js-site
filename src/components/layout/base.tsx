import clsx from "clsx";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { REPOSITORY, EMAIL_ADDRESS } from "#environment/vars";
import {
  AVAILABLE_THEMES,
  defaultTheme,
  setCurrentTheme,
  getCurrentTheme,
} from "#lib/theme";
import { LanguageSwitcher } from "#components/language";
import { useAccount } from "#lib/hooks";
import { SVGIcon } from "#components/icons";
import { LinkExternal, LinkInternal, LinkEmail } from "#components/links";
import { FancyNav, NavList, NavItem } from "#components/fancy/nav";
import { Form } from "#components/forms";
import { ButtonSubmit, Button } from "#components/buttons";
import { onParentBlur } from "#lib/browser/dom"
import styles from "./base.module.scss";

import type { FocusEvent } from "react";
import type { RootlessProps } from "#types/props";
import type { ButtonClickEvent } from "#components/fancy";

interface Props extends RootlessProps {}

/**
 * @TODO: rewrite into a single nested lest.
 */
export function BaseLayout({ children }: Props) {
  const { t } = useTranslation("layout");
  const [isVisible, changeVisibility] = useState(false);

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
        <FancyNav className={styles.nav} onBlur={onParentBlur(changeVisibility, false)}>
          <Button
            className={styles.button}
            iconID={"signs-post"}
            onClick={() => {
              changeVisibility(!isVisible);
            }}
          >
            {t("navigation")}
          </Button>
          <NavList
            className={clsx(styles.list, isVisible && styles.list_visible)}
          >
            <NavItem>
              <LinkInternal href="/" className={styles.navLink}>
                <SVGIcon iconID="react" />
                <span>{t("home")}</span>
              </LinkInternal>
            </NavItem>
            <NavItem>
              <LinkInternal href="/blog" className={styles.navLink}>
                <SVGIcon iconID="blog" />
                <span>{t("blog")}</span>
              </LinkInternal>
            </NavItem>
            <NavItem>
              <LinkInternal href="/about" className={styles.navLink}>
                <SVGIcon iconID="biohazard" />
                <span>{t("about")}</span>
              </LinkInternal>
            </NavItem>
            <NavItem>
              <LinkInternal href="/status" className={styles.navLink}>
                <SVGIcon iconID="temperature-three-quarters" />
                <span>{t("status")}</span>
              </LinkInternal>
            </NavItem>
          </NavList>

          <NavList className={styles.misc}>
            <NavItem className={styles.lang}>
              <LanguageSwitcher />
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
                <span>{t("source-code")}</span>
              </LinkExternal>
            </NavItem>
          </NavList>
        </FancyNav>
        <address className={styles.contacts}>
          {t("contacts")}:
          <br />
          <LinkEmail email={EMAIL_ADDRESS}>Email</LinkEmail>
        </address>
      </footer>
    </>
  );
}

function AccountNav() {
  const { t } = useTranslation("layout");
  const { account, isLoading } = useAccount();
  const [isOpen, changeOpen] = useState(false);
  const isLoggedIn = Boolean(!isLoading && account);

  return (
    <NavItem
      onBlur={onParentBlur(changeOpen, false)}
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
        iconID={"user-circle"}
      >
        {t("account")}
      </Button>
      <NavList className={clsx(styles.list)}>
        {isLoggedIn ? (
          <>
            <NavItem>
              <LinkInternal href="/account" className={styles.navLink}>
                <span>{t("information")}</span>
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
                    <span>{t("logout")}</span>
                    <SVGIcon iconID="sign-out-alt" />
                  </ButtonSubmit>
                }
              />
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <LinkInternal href="/auth/login" className={styles.navLink}>
                <span>{t("login")}</span>
                <SVGIcon iconID="sign-in-alt" />
              </LinkInternal>
            </NavItem>
            <NavItem>
              <LinkInternal href="/auth/register" className={styles.navLink}>
                <span>{t("register")}</span>
                <SVGIcon iconID="user-plus" />
              </LinkInternal>
            </NavItem>
          </>
        )}
      </NavList>
    </NavItem>
  );
}
