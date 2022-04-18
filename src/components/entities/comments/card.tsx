import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useAccount } from "#lib/hooks";
import { useAppDispatch } from "#store/redux";
import { approveCommentAsync } from "#store/redux/reducers";
import { blockComponent } from "#components/meta";
import { Card, CardBody, CardHeader, CardFooter } from "#components/cards";
import { Heading } from "#components/headings";
import { DateTimeView } from "#components/dates";
import { LinkInternal, LinkLocal } from "#components/links";
import { DL, DS } from "#components/lists/d-list";
import { Button } from "#components/buttons";
import styles from "./card.module.scss";

import type { ICommentClient } from "#types/entities";
import type { ICardProps } from "#components/cards";

export interface ICommentProps extends Omit<ICardProps, "id"> {
  comment: ICommentClient;
  /**
   * Show comment's destination.
   * @default true
   */
  isDestinationShown?: boolean;
}

export const CommentCard = blockComponent<ICommentProps>(
  styles.block,
  Component
);

function Component({
  comment,
  headingLevel = 2,
  isDestinationShown = true,
  ...blockProps
}: ICommentProps) {
  const { t } = useTranslation("components");
  const dispatch = useAppDispatch();
  const { account, isAdmin } = useAccount();
  const [isReplying, switchReplyState] = useState(false);
  const { id, parent_id, content, created_at, is_public, blog_slug } = comment;
  const isAbleToApprove = !is_public && isAdmin;

  return (
    <Card {...blockProps} id={`comment-${id}`}>
      <CardHeader>
        <Heading level={headingLevel}>Anonymous</Heading>
        {isDestinationShown && blog_slug && (
          <p>
            Commented on{" "}
            <LinkInternal href={`/blog/${blog_slug}`}>blog post</LinkInternal>
          </p>
        )}
        {parent_id && (
          <p>
            Reply to{" "}
            <LinkLocal targetID={`comment-${parent_id}`}>{parent_id}</LinkLocal>
          </p>
        )}
      </CardHeader>
      <CardBody>{content}</CardBody>
      <CardFooter>
        <DL>
          <DS
            dKey={"Posted at"}
            dValue={<DateTimeView dateTime={created_at} />}
          />
        </DL>
        {isAbleToApprove && (
          <Button
            onClick={() => {
              dispatch(approveCommentAsync(id));
            }}
          >
            Approve
          </Button>
        )}
        {account && (
          <Button
            onClick={() => {
              switchReplyState(!isReplying);
            }}
          >
            Reply
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
