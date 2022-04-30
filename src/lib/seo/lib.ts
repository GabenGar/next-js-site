import { ProjectURL } from "#lib/url";

import type { NextSeoProps } from "next-seo";
import type { ILocaleInfo } from "#lib/language";
import type { OpenGraphMedia } from "next-seo/lib/types";

export interface ICreateSEOTagsProps {
  localeInfo: ILocaleInfo;
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

export function createSEOTags({
  title,
  description,
  canonicalPath,
  localeInfo,
  image,
}: ICreateSEOTagsProps): NextSeoProps {
  const canonicalURL =
    canonicalPath &&
    new ProjectURL(localeInfo, canonicalPath).toCanonical().toString();

  const seoTags: NextSeoProps = {
    title: title,
    description: description,
    canonical: canonicalURL,
    openGraph: {
      images: image && [image],
    },
  };

  return seoTags;
}
