import Head from "next/head";
import { siteTitle } from "#lib/util";
import { getBlogPosts } from "#lib/blog";
import { Page } from "#components/pages";
import { CardList } from "#components/lists";
import { BlogPostCard } from "#components/entities/blog";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";
import type { BlogPost } from "#lib/blog";

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
      <CardList>
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </CardList>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<IBlogPageProps, IBlogPageParams> =
  async (context) => {
    const posts = await getBlogPosts();

    return {
      props: {
        posts,
      },
    };
  };

export default BlogPage;
