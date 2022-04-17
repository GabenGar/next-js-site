import { useTranslation } from "next-i18next";
import { blockComponent } from "#components/meta";
import { Card, CardBody, CardHeader, CardFooter } from "#components/cards";
import { Heading } from "#components/headings";
import { DateTimeView } from "#components/dates";
import { LinkInternal } from "#components/links";
import { DL, DS } from "#components/lists/d-list";
import styles from "./card.module.scss";

import type { ICommentClient } from "#types/entities";
import type { ICardProps } from "#components/cards";
import { useAccount } from "#lib/hooks";
import { Button } from "#components/buttons";

export interface ICommentProps extends ICardProps {
  comment: ICommentClient;
}

export const CommentCard = blockComponent<ICommentProps>(
  styles.block,
  Component
);

function Component({
  comment,
  headingLevel = 2,
  ...blockProps
}: ICommentProps) {
  const { t } = useTranslation("components");
  const { account } = useAccount()

  return (
    <Card {...blockProps}>
      <CardHeader>
        <Heading level={headingLevel}>Anonymous</Heading>
        {comment.parent_id && <p>Reply to {comment.parent_id}</p>}
      </CardHeader>
      <CardBody>{comment.content}</CardBody>
      <CardFooter>
        <DL>
          <DS
            dKey={"Posted at"}
            dValue={<DateTimeView dateTime={comment.created_at} />}
          />
        </DL>
        {account && <Button>Reply</Button>}
      </CardFooter>
    </Card>
  );
}
