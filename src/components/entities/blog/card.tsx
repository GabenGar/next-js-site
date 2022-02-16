import { blockComponent } from "#components/meta";
import { Card, CardBody, CardHeader, CardFooter } from "#components/cards";
import { Heading } from "#components/headings";
import { LinkInternal } from "#components/links";
import { DL, DS } from "#components/lists/d-list";
import styles from "./card.module.scss";

import type { BlogPost } from "#lib/blog";
import type { ICardProps } from "#components/cards";

export interface IBlogPostProps extends ICardProps {
  post: BlogPost;
}

export const BlogPostCard = blockComponent<IBlogPostProps>(
  styles.block,
  ({ post, headingLevel = 2, ...blockProps }) => {
    return (
      <Card {...blockProps}>
        <CardHeader>
          <Heading level={headingLevel}>{post.title}</Heading>
          <DL className={styles.meta}>
            <DS dKey={"By"} dValue={post.author} />
            <DS dKey={"Published"} dValue={post.created_at} />
          </DL>
        </CardHeader>
        <CardBody>{post.excerpt}</CardBody>
        <CardFooter>
          <LinkInternal
            href={{
              pathname: "/blog/[slug]",
              query: { slug: post.slug },
            }}
          >
            Read more
          </LinkInternal>
        </CardFooter>
      </Card>
    );
  }
);
