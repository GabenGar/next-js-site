import { useTranslation } from "next-i18next";
import { blockComponent } from "#components/meta";
import {
  Article,
  ArticleBody,
  ArticleFooter,
  ArticleHeader,
} from "#components/articles";
import { DL, DS } from "#components/lists/d-list";
import { DateTimeView } from "#components/dates";
import styles from "./article.module.scss";

import type { IArticleProps } from "#components/articles";
import type { BlogPost } from "#lib/blog";

export interface IBlogPostArticleProps extends IArticleProps {
  post: BlogPost;
}

/**
 * TODO: fix excerpt appearing before h1.
 */
export const BlogPostArticle = blockComponent<IBlogPostArticleProps>(
  styles.block,
  Component
);

function Component({ post }: IBlogPostArticleProps) {
  const { t } = useTranslation("components");

  return (
    <Article>
      <ArticleHeader>
        <DL>
          <DS dKey={t("blog_by")} dValue={post.author} />
          <DS
            dKey={t("blog_published")}
            dValue={<DateTimeView dateTime={post.created_at} />}
          />
          {post.edited_at && (
            <DS
              dKey={t("blog_edited")}
              dValue={<DateTimeView dateTime={post.edited_at} />}
            />
          )}
        </DL>
      </ArticleHeader>
      <ArticleBody
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></ArticleBody>
      {/* <ArticleFooter></ArticleFooter> */}
    </Article>
  );
}
