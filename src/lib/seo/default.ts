import { VercelLogo } from "#assets";
import { ERROR_MESSAGE } from "#environment/constants";
import { SITE_NAME } from "#environment/vars";

import type { StaticImageData } from "next/image";
import type { DefaultSeoProps } from "next-seo";

const logo = VercelLogo as StaticImageData;

export const defaultSEOProps: DefaultSeoProps = {
  titleTemplate: `%s | ${SITE_NAME}`,
  /**
   * Show error message if `title` is not set.
   */
  defaultTitle: ERROR_MESSAGE,
  additionalLinkTags: [{ rel: "icon", href: "/favicon.ico" }],
  openGraph: {
    type: "website",
    site_name: SITE_NAME,
    images: [
      {
        url: new URL(logo.src).toString(),
        width: 100,
        height: 100,
      }
    ]
  }
};
