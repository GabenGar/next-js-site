import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { siteTitle } from "#lib/util";
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
  return (
    <Page>
      <Head>
        <title>{siteTitle(post.title)}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <BlogPostArticle post={post} />
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths<BlogPostPageParams> = async ({
  locales,
}) => {
  const allSlugs = await getAllSlugs();
  const paths = allSlugs.map<{ params: BlogPostPageParams }>((slug) => {
    return { params: { slug } };
  });

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
      post,
    },
  };
};

export default BlogPostPage;
