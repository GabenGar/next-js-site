import "#styles/globals.scss";
import { useEffect, useState } from "react";
import { initClient } from "#lib";
import { BaseLayout } from "#components/page";

import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [isInitialized, initialize] = useState(false);
  const getLayout =
    Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>);

  useEffect(() => {
    initClient();
    initialize(true)
  }, []);

  if (!isInitialized) {
    return <div>Loading</div>
  }

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
