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
import styles from "./card.module.scss";

import type { ICommentClient } from "#types/entities";
import type { ICardProps } from "#components/cards";

export interface ICommentProps extends Omit<ICardProps, "id"> {
  comment: ICommentClient;
}

/**
 * Frontend mentor specific comment card.
 */
export const FMCommentCard = blockComponent<ICommentProps>(
  styles.block,
  Component
);

function Component({
  comment,
  headingLevel = 2,
  ...blockProps
}: ICommentProps) {
  const { t } = useTranslation("components");
  const dispatch = useAppDispatch();
  const { account, isAdmin } = useAccount();
  const [isReplying, switchReplyState] = useState(false);
  const { id, parent_id, content, created_at, is_public, blog_slug } = comment;

  return (
    <Card {...blockProps} id={`comment-${id}`}>
      <CardHeader></CardHeader>
      <CardBody>{content}</CardBody>
      <CardFooter>        
      </CardFooter>
    </Card>
  );
}
