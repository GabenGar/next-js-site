import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "#store/redux";
import {
  hideFMComment,
  selectFMSlice,
  unhideFMComment,
} from "#store/redux/reducers";
import { blockComponent } from "#components/meta";
import { Card, CardBody, CardHeader, CardFooter } from "#components/cards";
import { Heading } from "#components/headings";
import { DateTimeView } from "#components/dates";
import { LinkInternal, LinkLocal } from "#components/links";
import { DL, DS } from "#components/lists/d-list";
import { Button, ButtonList } from "#components/buttons";
import { SVGIcon } from "#components/icons";
import { Image } from "#components/images";
import { NewCommentForm } from "./new-comment";
import styles from "./comment-card.module.scss";

import type { IFMComment } from "#types/frontend-mentor";
import type { ICardProps } from "#components/cards";

export interface IFMCommentProps extends Omit<ICardProps, "id"> {
  comment: IFMComment;
}

/**
 * Frontend mentor specific comment card.
 */
export const FMCommentCard = blockComponent<IFMCommentProps>(
  styles.block,
  Component
);

function Component({
  comment,
  headingLevel = 3,
  className,
  ...blockProps
}: IFMCommentProps) {
  const { t } = useTranslation("components");
  const dispatch = useAppDispatch();
  const { hiddenComments } = useAppSelector(selectFMSlice());
  const [isVisible, switchVisibility] = useState(
    !hiddenComments.includes(comment.id)
  );
  const [isReplying, switchReplyState] = useState(false);
  const [isEditing, switchEditionMode] = useState(false);
  const isOwnPost = false;
  const {
    id,
    parent_id,
    content,
    created_at,
    name,
    likes,
    dislikes,
    avatar_url,
  } = comment;

  return (
    <Card
      className={clsx(className, !isVisible && styles.block_hidden)}
      {...blockProps}
      id={`comment-${id}`}
    >
      {!isVisible ? (
        <CardHeader className={styles.stub}>
          <p>
            This post is hidden.{" "}
            <Button
              onClick={() => {
                dispatch(unhideFMComment(id));
                switchVisibility(true);
              }}
            >
              Unhide
            </Button>
          </p>
        </CardHeader>
      ) : (
        <>
          <CardHeader className={styles.header}>
            <Image
              className={styles.avatar}
              src={avatar_url}
              imageSize="3em"
              type="external"
            />
            <Heading className={styles.name} level={headingLevel}>
              {name} {isOwnPost && "(you)"}
            </Heading>
            <DL className={styles.date}>
              <DS
                dKey={"Posted at"}
                dValue={<DateTimeView dateTime={created_at} />}
              />
            </DL>
          </CardHeader>

          <CardBody className={styles.body}>
            <p className={styles.content}>{content}</p>
          </CardBody>

          <ButtonList className={styles.rating}>
            <Button>
              <SVGIcon iconID="fm-minus" />
            </Button>
            <span>{likes - dislikes}</span>
            <Button>
              <SVGIcon iconID="fm-plus" />
            </Button>
          </ButtonList>

          {!isReplying ? (
            <ButtonList className={styles.actions}>
              {isOwnPost ? (
                <>
                  <Button iconID="fm-delete">Delete</Button>
                  <Button iconID="fm-edit">Edit</Button>
                </>
              ) : (
                <>
                  <Button
                    iconID="mask"
                    onClick={() => {
                      dispatch(hideFMComment(id));
                      switchVisibility(false);
                    }}
                  >
                    Hide
                  </Button>
                  <Button
                    iconID="fm-reply"
                    onClick={() => {
                      switchReplyState(!isReplying);
                    }}
                  >
                    Reply
                  </Button>
                </>
              )}
            </ButtonList>
          ) : (
            <NewCommentForm parentID={parent_id} />
          )}
        </>
      )}
    </Card>
  );
}
