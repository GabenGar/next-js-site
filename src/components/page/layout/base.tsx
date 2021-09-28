import styles from "./base.module.scss";

import type { BaseProps } from "#types";

interface Props extends BaseProps {
  isSkeleton?: boolean;
}

export function BaseLayout({ isSkeleton, children }: Props) {

  if (isSkeleton) {
    return (<>
      {children}
    </>);
  }

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
