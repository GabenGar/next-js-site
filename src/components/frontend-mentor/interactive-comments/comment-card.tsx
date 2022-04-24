import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "#store/redux";
import {
  hideFMComment,
  selectFMCommentInfo,
  unhideFMComment,
  likeFMComment,
  dislikeFMComment,
  deleteFMComment,
  updateFMComment,
} from "#store/redux/reducers";
import { blockComponent } from "#components/meta";
import { Form } from "#components/forms";
import { TextArea } from "#components/forms/sections";
import { Card, CardBody, CardHeader, CardFooter } from "#components/cards";
import { Heading } from "#components/headings";
import { DateTimeView } from "#components/dates";
import { LinkInternal, LinkLocal } from "#components/links";
import { DL, DS } from "#components/lists/d-list";
import { Button, ButtonList, ConfirmationDialogue } from "#components/buttons";
import { SVGIcon } from "#components/icons";
import { Image } from "#components/images";
import { NewCommentForm } from "./new-comment";
import styles from "./comment-card.module.scss";

import type { IFMComment } from "#types/frontend-mentor";
import type { ICardProps } from "#components/cards";
import type { ISerialInteger } from "#types/entities";

const cardStates = ["view", "reply", "edit", "delete"] as const;
type ICardState = typeof cardStates[number];

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

/**
 * @TODOs:
 * - rewrite into a dumb component
 * - fix deletion flow
 */
function Component({
  comment,
  headingLevel = 3,
  className,
  ...blockProps
}: IFMCommentProps) {
  const { t } = useTranslation("components");
  const dispatch = useAppDispatch();
  const [mode, switchMode] = useState<ICardState>("view");
  const isReplying = mode === "reply";
  const isEditing = mode == "edit";
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
  const { isVisible, isLiked, isDisliked, rating, isOwn } = useAppSelector(
    selectFMCommentInfo(id)
  );
  const ratingClass = clsx(
    styles.rating,
    (isLiked || isOwn) && styles.rating_liked,
    isDisliked && styles.rating_disliked
  );
  const ratingCountClass = clsx(
    styles.count,
    rating && styles[`count_${rating}`]
  );
  const actionsClass = clsx(styles.actions, styles[`actions_${mode}`]);
  const formEditID = `content-${id}`;

  return (
    <>
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
                {name} {isOwn && "(you)"}
              </Heading>
              <DL className={styles.date}>
                <DS
                  dKey={"Posted at"}
                  dValue={<DateTimeView dateTime={created_at} />}
                />
              </DL>
            </CardHeader>

            <CardBody
              className={clsx(styles.body, isEditing && styles.body_editing)}
            >
              {!isEditing ? (
                <p className={styles.content}>{content}</p>
              ) : (
                <Form
                  id={formEditID}
                  className={styles.contentForm}
                  submitButton={<></>}
                  onSubmit={(event) => {
                    event.preventDefault();
                    const form = event.currentTarget as HTMLFormElement;
                    const content = // @ts-expect-error
                    (form.elements["content"] as HTMLTextAreaElement).value;

                    dispatch(updateFMComment({ id, content }));
                    switchMode("view");
                  }}
                >
                  <TextArea
                    id={`comment-edit-${id}`}
                    name="content"
                    defaultValue={content}
                  />
                </Form>
              )}
            </CardBody>

            <ButtonList className={ratingClass}>
              <Button
                className={styles.dislike}
                onClick={() => {
                  dispatch(dislikeFMComment(id));
                }}
              >
                <SVGIcon iconID="fm-minus" />
              </Button>
              <span className={ratingCountClass}>{likes - dislikes}</span>
              <Button
                className={styles.like}
                onClick={() => {
                  dispatch(likeFMComment(id));
                }}
              >
                <SVGIcon iconID="fm-plus" />
              </Button>
            </ButtonList>

            <div className={actionsClass}>
              <ButtonList className={styles.view}>
                {isOwn ? (
                  <>
                    <Button
                      iconID="fm-delete"
                      onClick={() => {
                        switchMode("delete");
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      iconID="fm-edit"
                      onClick={() => {
                        switchMode(isEditing ? "view" : "edit");
                      }}
                    >
                      Edit
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      iconID="mask"
                      onClick={() => {
                        dispatch(hideFMComment(id));
                      }}
                    >
                      Hide
                    </Button>
                  </>
                )}
                <Button
                  iconID="fm-reply"
                  onClick={() => {
                    switchMode(isReplying ? "view" : "reply");
                  }}
                >
                  Reply
                </Button>
              </ButtonList>
              <Form
                className={styles.delete}
                submitButton={
                  <ConfirmationDialogue
                    iconID="fm-delete"
                    message={"Are you sure to delete?"}
                    onDecline={() => {
                      switchMode("view");
                    }}
                  >
                    Delete
                  </ConfirmationDialogue>
                }
                onSubmit={(event) => {
                  event.preventDefault();
                  dispatch(deleteFMComment(id));
                }}
              ></Form>
              <ConfirmationDialogue
                className={styles.edit}
                formID={formEditID}
                onDecline={() => {
                  switchMode("view");
                }}
              >
                Update
              </ConfirmationDialogue>
            </div>
          </>
        )}
      </Card>
      {isReplying && (
        <NewCommentForm
          parentID={id}
          onClosing={() => {
            switchMode("view");
          }}
        />
      )}
    </>
  );
}
