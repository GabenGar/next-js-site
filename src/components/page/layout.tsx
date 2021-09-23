import styles from "./layout.module.scss";

import type { PropsWithChildren } from "react";

interface Props {}

export function Layout({ children }: PropsWithChildren<Props>) {
  return (<>
    <header>
    </header>

    <main className={styles.main}>
      {children}
    </main>

    <footer>
    </footer>
  </>);
}
