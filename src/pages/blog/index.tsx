import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
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
  const { t } = useTranslation("blog");
  const title = t("blog_title");

  return (
    <Page heading={title}>
      <Head>
        <title>{siteTitle(title)}</title>
        <meta name="description" content={"blog_desc"} />
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
  async ({ locale }) => {
    const posts = await getBlogPosts();
    const localization = await serverSideTranslations(locale!, [
      "layout",
      "components",
      "blog",
    ]);

    return {
      props: {
        ...localization,
        posts,
      },
    };
  };

export default BlogPage;
