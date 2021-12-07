import styles from "./base.module.scss";

import type { RootlessProps } from "#types";

interface Props extends RootlessProps {
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
