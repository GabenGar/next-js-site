import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useAccount } from "#lib/hooks";
import { useAppDispatch } from "#browser/store/redux";
import { approveCommentAsync } from "#browser/store/redux/reducers";
import { blockComponent } from "#components/meta";
import { Card, CardBody, CardHeader, CardFooter } from "#components/cards";
import { Heading } from "#components/headings";
import { DateTimeView } from "#components/dates";
import { LinkInternal, LinkLocal } from "#components/links";
import { DL, DS } from "#components/lists/d-list";
import { Button, ButtonList } from "#components/buttons";
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
  /**
   * Show reply button, if applicable.
   * @default true
   */
  isReplyShown?: boolean;
}

export const CommentCard = blockComponent<ICommentProps>(
  styles.block,
  Component
);

function Component({
  comment,
  headingLevel = 2,
  isDestinationShown = true,
  isReplyShown = true,
  ...blockProps
}: ICommentProps) {
  const { t } = useTranslation("components");
  const dispatch = useAppDispatch();
  const { account, isAdmin } = useAccount();
  const [isReplying, switchReplyState] = useState(false);
  const { id, parent_id, content, created_at, is_public, blog_slug } = comment;
  const isAbleToApprove = !is_public && isAdmin;
  const buttonsClass = clsx(styles.buttons, isAbleToApprove && styles.buttons_approve, isReplyShown && styles.buttons_reply)

  return (
    <Card {...blockProps} id={`comment-${id}`}>
      <CardHeader>
        <Heading level={headingLevel}>{t("comment_default_author")}</Heading>
        {isDestinationShown && blog_slug && (
          <p>
            {t("comment_blog")}{" "}
            <LinkInternal href={`/blog/${blog_slug}`}>blog post</LinkInternal>
          </p>
        )}
        {parent_id && (
          <p>
            {t("comment_parent")}{" "}
            <LinkLocal targetID={`comment-${parent_id}`}>{parent_id}</LinkLocal>
          </p>
        )}
      </CardHeader>
      <CardBody>{content}</CardBody>
      <CardFooter>
        <DL>
          <DS
            dKey={t("comment_created_at")}
            dValue={<DateTimeView dateTime={created_at} />}
          />
        </DL>
        <ButtonList className={buttonsClass}>
        {isAbleToApprove && (
          <>
            {/* @TODO: reject comments */}
            {/* <Button>{t("comment_reject")}</Button> */}
            <Button
              onClick={() => {
                dispatch(approveCommentAsync(id));
              }}
            >
              {t("comment_approve")}
            </Button>
          </>
        )}
        {isReplyShown && account && (
          <Button
            onClick={() => {
              switchReplyState(!isReplying);
            }}
          >
            {t("comment_reply")}
          </Button>
        )}
        </ButtonList>
        
      </CardFooter>
    </Card>
  );
}
