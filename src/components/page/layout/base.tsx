import { Anchour } from "#components/fancy";
import styles from "./base.module.scss";

import type { RootlessProps } from "#types";
import { ENV_VARS } from "#configs/public";

interface Props extends RootlessProps {}

export function BaseLayout({ children }: Props) {
  return (
    <>
      <header className={styles.header}>

      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <Anchour href={ENV_VARS.REPOSITORY}>
          Source code
        </Anchour>
      </footer>
    </>
  );
}
