import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { getAllSlugs, getBlogPost } from "#lib/blog";
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
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const seoTags = createSEOTags({
    locale: router.locale!,
    title: post.title,
    description: post.excerpt,
    urlPath: router.pathname,
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

export const getStaticProps: GetStaticProps<
  BlogPostPageProps,
  BlogPostPageParams
> = async ({ locale, params }) => {
  const { slug } = params!;

  const post = await getBlogPost(slug);
  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "blog",
  ]);

  return {
    props: {
      ...localization,
      localeInfo: {
        locale: locale!,
        defaultLocale: defaultLocale!,
      },
      post,
    },
  };
};

export default BlogPostPage;
