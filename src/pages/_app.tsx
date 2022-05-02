import "#styles/globals.scss";
import Script from "next/script";
import { appWithTranslation } from "next-i18next";
import { Provider as ReduxProvider } from "react-redux";
import { DefaultSeo } from "next-seo";
import { defaultSEOProps } from "#lib/seo";
import { reduxStore } from "#store/redux";
import { BaseLayout } from "#components/layout";
import { ErrorBoundary } from "#components/errors";

import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import type { BasePageProps } from "#types/pages";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = Omit<AppProps<BasePageProps>, "pageProps"> & {
  Component: NextPageWithLayout;
  pageProps: BasePageProps;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { localeInfo } = pageProps;
  const getLayout =
    Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>);

  return (
    <ErrorBoundary>
      <Script id="theme-setup" strategy="beforeInteractive" async>{`
        const theme = document.cookie
          .split("; ")
          .find((row) => row.startsWith("theme="));
        const value = theme ? theme.split("=")[1] : "light";
        document.documentElement.dataset.theme = value;`}</Script>
      <ReduxProvider store={reduxStore}>
        <DefaultSeo
          openGraph={{ locale: localeInfo.locale }}
          {...defaultSEOProps}
        />
        {getLayout(<Component {...pageProps} />)}
      </ReduxProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation<AppPropsWithLayout>(MyApp);
