import clsx from "clsx";
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
import { Button, ButtonList } from "#components/buttons";
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
  headingLevel = 2,
  ...blockProps
}: IFMCommentProps) {
  const { t } = useTranslation("components");
  const dispatch = useAppDispatch();
  const { account } = useAccount();
  const [isReplying, switchReplyState] = useState(false);
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
    <Card {...blockProps} id={`comment-${id}`}>
      <CardHeader>
        <ButtonList>
          <Button>+</Button>
          <Button>-</Button>
        </ButtonList>
      </CardHeader>
      <CardBody>
        <Heading>{name}</Heading>
        <p>{content}</p>
      </CardBody>
      <CardFooter>
        <DL>
          <DS
            dKey={"Posted at"}
            dValue={<DateTimeView dateTime={created_at} />}
          />
        </DL>
        {!parent_id && (
          <ButtonList>
            <Button
              onClick={() => {
                switchReplyState(!isReplying);
              }}
            >
              Reply
            </Button>
          </ButtonList>
        )}
      </CardFooter>
    </Card>
  );
}
