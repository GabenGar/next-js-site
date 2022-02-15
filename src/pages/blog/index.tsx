import Head from "next/head";
import { IS_DEVELOPMENT } from "#environment/derived";
import { siteTitle } from "#lib/util";
import { Page } from "#components/pages";
import { getBlogPosts } from "#lib/blog";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";
import type { BlogPost } from "#lib/blog";
import { JSONView } from "#components/json";

interface IBlogPageProps extends BasePageProps {
  posts: BlogPost[];
}

interface IBlogPageParams extends ParsedUrlQuery {}

function BlogPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page heading="Blog">
      <Head>
        <title>{siteTitle("Blog")}</title>
        <meta name="description" content="My blog" />
      </Head>
      {/* @ts-expect-error */}
      <JSONView json={posts} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<IBlogPageProps, IBlogPageParams> =
  async (context) => {
    if (!IS_DEVELOPMENT) {
      return {
        notFound: true,
      };
    }

    const posts = await getBlogPosts();

    return {
      props: {
        posts,
      },
    };
  };

export default BlogPage;
