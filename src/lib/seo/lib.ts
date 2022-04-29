import { SITE_NAME } from "#environment/vars";
import { VercelLogo } from "#assets";
import { ProjectURL } from "#lib/util";

import type { StaticImageData } from "next/image";
import type { NextSeoProps } from "next-seo";
import type { OpenGraphMedia } from "next-seo/lib/types";

export interface ICreateSEOTagsProps {
  locale: string;
  title: string;
  description: string;
  /**
   * The path used to build a canonical URL.
   */
  canonicalPath?: string | URL;
  /**
   * An image url, will use the site logo if empty.
   */
  image?: OpenGraphMedia;
}

const logo = VercelLogo as StaticImageData;

/**
 * @TODO canonical url builder
 */
export function createSEOTags({
  title,
  description,
  canonicalPath,
  locale,
  image,
}: ICreateSEOTagsProps): NextSeoProps {
  const imageObj: OpenGraphMedia = image
    ? image
    : {
        url: new ProjectURL(logo.src).toString(),
      };
  const canonicalURL =
    canonicalPath && new ProjectURL(canonicalPath).toString();

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
