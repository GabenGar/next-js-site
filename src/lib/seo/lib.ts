import type { NextSeoProps } from "next-seo";

export interface ICreateSEOTagsProps {
  title: string;
  description: string;
}

export function createSEOTags({
  title,
  description,
}: ICreateSEOTagsProps): NextSeoProps {
  const seoTags: NextSeoProps = {
    title: title,
    description: description,
  };

  return seoTags;
}
