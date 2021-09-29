import styles from "./rest-countries.module.scss";

import type { BaseProps } from "#types";

interface Props extends BaseProps {
}

export function RESTCountries({ children }: Props) {
  return (<>
    <header className={styles.header}>
      REST Header
    </header>

    <main className={styles.main}>
      {children}
    </main>

    <footer className={styles.footer}>
      REST Footer
    </footer>
  </>);
}
