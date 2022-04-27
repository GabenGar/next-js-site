import { ERROR_MESSAGE } from "#environment/constants";
import { SITE_NAME } from "#environment/vars";

import type { DefaultSeoProps } from "next-seo";

export const defaultSEOProps: DefaultSeoProps = {
  titleTemplate: `%s | ${SITE_NAME}`,
  /**
   * Show error message if `title` is not set.
   */
  defaultTitle: ERROR_MESSAGE,
  additionalLinkTags: [{ rel: "icon", href: "/favicon.ico" }],
};
