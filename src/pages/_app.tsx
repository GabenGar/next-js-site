import "#styles/globals.scss";
import { appWithTranslation } from "next-i18next";
import { Provider as ReduxProvider } from "react-redux";
import { DefaultSeo } from "next-seo";
import { defaultSEOProps } from "#lib/seo";
import { reduxStore } from "#store/redux";
import { BaseLayout } from "#components/layout";

import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { ErrorBoundary } from "src/components/errors/error-boundary";

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
    <ErrorBoundary>
      <ReduxProvider store={reduxStore}>
        <DefaultSeo {...defaultSEOProps} />
        {getLayout(<Component {...pageProps} />)}
      </ReduxProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp);
