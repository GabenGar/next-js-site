import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { createNextURL } from "#lib/language";
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

function BlogPage({
  localeInfo,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("blog");
  const seoTags = createSEOTags({
    locale: localeInfo.locale,
    title: t("blog_title"),
    description: t("blog_desc"),
    canonicalPath: createNextURL(localeInfo, "/blog"),
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

export const getStaticProps: GetStaticProps<
  IBlogPageProps,
  IBlogPageParams
> = async ({ locale, defaultLocale }) => {
  const posts = await getBlogPosts();
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
      posts,
    },
  };
};

export default BlogPage;
