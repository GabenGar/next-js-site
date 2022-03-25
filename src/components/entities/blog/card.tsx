import { useTranslation } from "next-i18next";
import { blockComponent } from "#components/meta";
import { Card, CardBody, CardHeader, CardFooter } from "#components/cards";
import { Heading } from "#components/headings";
import { DateTimeView } from "#components/dates";
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
  Component
);

function Component({ post, headingLevel = 2, ...blockProps }: IBlogPostProps) {
  const { t } = useTranslation("components");

  return (
    <Card {...blockProps}>
      <CardHeader>
        <Heading level={headingLevel}>{post.title}</Heading>
        <DL className={styles.meta}>
          <DS dKey={t("blog_by")} dValue={post.author} />
          <DS
            dKey={t("blog_published")}
            dValue={<DateTimeView dateTime={post.created_at} />}
          />
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
          {t("blog_read_more")}
        </LinkInternal>
      </CardFooter>
    </Card>
  );
}
