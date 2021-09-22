import styles from "./layout.module.scss";

import type { FC } from "react";

export const Layout: FC = ({ children }) => {
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
