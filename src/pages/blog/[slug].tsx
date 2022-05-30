import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { getAllSlugs, getBlogPost } from "#lib/blog";
import { createStaticProps } from "#server/requests";
import { Page } from "#components/pages";
import { BlogPostArticle } from "#components/entities/blog";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";
import type { BlogPost } from "#lib/blog";

interface BlogPostPageProps extends BasePageProps {
  post: BlogPost;
}

interface BlogPostPageParams extends ParsedUrlQuery {
  slug: string;
}

function BlogPostPage({
  localeInfo,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const seoTags = createSEOTags({
    localeInfo,
    title: post.title,
    description: post.excerpt,
    canonicalPath: `/blog/${post.slug}`,
  });

  return (
    <Page seoTags={seoTags}>
      <BlogPostArticle post={post} />
    </Page>
  );
}

/**
 * @TODO proper separation by locales
 */
export const getStaticPaths: GetStaticPaths<BlogPostPageParams> = async ({
  locales,
}) => {
  const allSlugs = await getAllSlugs();
  const paths = allSlugs.reduce<{ params: BlogPostPageParams }[]>(
    (paths, slug) => {
      const localePaths = locales!.map((locale) => {
        return { params: { slug }, locale };
      });
      paths.push(...localePaths);

      return paths;
    },
    []
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = createStaticProps<
BlogPostPageProps,
BlogPostPageParams
>(
  {
    extraLangNamespaces: ["blog"],
  },
  async ({ params }) => {
    const { slug } = params!;

  const post = await getBlogPost(slug);

    return {
      props: {
        post,
      },
    };
  }
);

export default BlogPostPage;
