import { blockComponent } from "#components/meta";
import {
  Article,
  ArticleBody,
  ArticleFooter,
  ArticleHeader,
} from "#components/articles";
import { DL, DS } from "#components/lists/d-list";
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
  ({ post }) => {
    return (
      <Article>
        <ArticleHeader>
          <DL>
            <DS dKey={"By"} dValue={post.author} />
            <DS dKey={"Published"} dValue={post.created_at} />
            {post.edited_at && <DS dKey={"Edited"} dValue={post.edited_at} />}
          </DL>
        </ArticleHeader>
        <ArticleBody
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></ArticleBody>
        <ArticleFooter></ArticleFooter>
      </Article>
    );
  }
);
