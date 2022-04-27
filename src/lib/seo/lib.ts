import { SITE_ORIGIN, SITE_NAME } from "#environment/vars";
import { VercelLogo } from "#assets";

import type { StaticImageData } from "next/image";
import type { NextSeoProps } from "next-seo";
import type { OpenGraphMedia } from "next-seo/lib/types";

export interface ICreateSEOTagsProps {
  locale: string;
  title: string;
  description: string;
  /**
   * Only use it for paths without search parameters.
   */
  urlPath?: string;
  /**
   * An image url, will use the site logo if empty.
   */
  image?: OpenGraphMedia;
}

const logo = VercelLogo as StaticImageData;
export function createSEOTags({
  title,
  description,
  urlPath,
  locale,
  image,
}: ICreateSEOTagsProps): NextSeoProps {
  const imageObj: OpenGraphMedia = image
    ? image
    : {
        url: new URL(logo.src, SITE_ORIGIN).toString(),
      };
  const canonicalURL = urlPath && new URL(urlPath, SITE_ORIGIN).toString();
  const seoTags: NextSeoProps = {
    title: title,
    description: description,
    canonical: canonicalURL,
    openGraph: {
      type: "website",
      site_name: SITE_NAME,
      locale: locale,
      images: [imageObj],
    },
  };

  return seoTags;
}
