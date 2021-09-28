import '#styles/globals.scss';
import { BaseLayout } from '#components/page';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (<BaseLayout>
    <Component {...pageProps} />
  </BaseLayout>);
}

export default MyApp
