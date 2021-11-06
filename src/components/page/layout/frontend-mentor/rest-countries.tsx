import { LocalAnchour } from "#components/fancy";
import styles from "./rest-countries.module.scss";
import type { BaseProps } from "#types";

interface Props extends BaseProps {
}

export function RESTCountries({ children }: Props) {
  return (<>
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <LocalAnchour href="/">
              Home
            </LocalAnchour>
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
    </header>

    <main className={styles.main}>
      {children}
    </main>

    <footer className={styles.footer}>
      REST Footer
    </footer>
  </>);
}
