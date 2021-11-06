import styles from "./base.module.scss";

import type { BaseProps } from "#types";

interface Props extends BaseProps {
}

export function BaseLayout({ children }: Props) {

  return (<>
    <header className={styles.header}>
    </header>

    <main className={styles.main}>
      {children}
    </main>

    <footer className={styles.footer}>
    </footer>
  </>);
}
