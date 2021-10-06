import '#styles/globals.scss';

import type { AppProps } from 'next/app';
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from 'react';
import { BaseLayout } from "#components/page";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => (<BaseLayout>{page}</BaseLayout>));
  return getLayout(
    <Component {...pageProps} />
  );
}

export default MyApp;
