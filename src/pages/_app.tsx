import "#styles/globals.scss";
import { appWithTranslation } from "next-i18next";
import { Provider as ReduxProvider } from "react-redux";
import { DefaultSeo } from "next-seo";
import { defaultSEOProps } from "#lib/seo";
import { ProjectError } from "#lib/errors";
import { toJSON } from "#lib/json";
import { reduxStore } from "#browser/store/redux";
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
  if (!localeInfo?.locale) {
    throw new ProjectError(
      [
        "The page did not provide a locale. Locale data:",
        toJSON(localeInfo),
        "Page props:",
        toJSON(pageProps),
      ].join("\n")
    );
  }

  const getLayout =
    Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>);

  return (
    <ErrorBoundary>
      {/* @TODO: proper use of `next/script` */}
      <script
        id="theme-setup"
        async
        dangerouslySetInnerHTML={{
          __html: `const theme = document.cookie
        .split("; ")
        .find((row) => row.startsWith("theme="));
      const value = theme ? theme.split("=")[1] : "light";
      document.documentElement.dataset.theme = value;`,
        }}
      ></script>
      {/* <Script
        id="theme-setup"
        strategy="beforeInteractive"
        async
        dangerouslySetInnerHTML={{
          __html: `const theme = document.cookie
        .split("; ")
        .find((row) => row.startsWith("theme="));
      const value = theme ? theme.split("=")[1] : "light";
      document.documentElement.dataset.theme = value;`,
        }}
      ></Script> */}
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
