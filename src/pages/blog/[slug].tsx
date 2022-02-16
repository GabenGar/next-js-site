import Head from "next/head";
import { IS_DEVELOPMENT } from "#environment/derived";
import { siteTitle } from "#lib/util";
import { getAllSlugs, getBlogPost } from "#lib/blog";
import { Page } from "#components/pages";
import { BlogPostArticle } from "#components/entities/blog";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
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

export const getStaticPaths: GetStaticPaths<BlogPostPageParams> = async (
  context
) => {
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
> = async (context) => {
  if (!IS_DEVELOPMENT) {
    return {
      notFound: true,
    };
  }

  const { slug } = context.params!;

  const post = await getBlogPost(slug);

  return {
    props: {
      post,
    },
  };
};

export default BlogPostPage;
