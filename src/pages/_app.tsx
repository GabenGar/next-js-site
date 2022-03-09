import "#styles/globals.scss";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "#store/redux";
import { BaseLayout } from "#components/layout";

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
  const getLayout =
    Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>);

  return (
    <ReduxProvider store={reduxStore}>
      {getLayout(<Component {...pageProps} />)}
    </ReduxProvider>
  );
}

export default MyApp;
