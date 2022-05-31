import { useTranslation } from "next-i18next";
import { createSEOTags } from "#lib/seo";
import { getBlogPosts } from "#lib/blog";
import { createStaticProps } from "#server/requests";
import { Page } from "#components/pages";
import { CardList } from "#components/lists";
import { BlogPostCard } from "#components/entities/blog";

import type { InferGetStaticPropsType } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { BasePageProps } from "#types/pages";
import type { BlogPost } from "#lib/blog";

interface IBlogPageProps {
  posts: BlogPost[];
}

interface IBlogPageParams extends ParsedUrlQuery {}

function BlogPage({
  localeInfo,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("blog");
  const seoTags = createSEOTags({
    localeInfo,
    title: t("blog_title"),
    description: t("blog_desc"),
    canonicalPath: "/blog",
  });

  return (
    <Page seoTags={seoTags}>
      <CardList>
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </CardList>
    </Page>
  );
}

export const getStaticProps = createStaticProps<
  IBlogPageProps,
  IBlogPageParams
>(
  {
    extraLangNamespaces: ["blog"],
  },
  async () => {
    const posts = await getBlogPosts();

    return {
      props: {
        posts,
      },
    };
  }
);

export default BlogPage;
