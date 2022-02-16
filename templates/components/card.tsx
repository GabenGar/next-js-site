import { blockComponent } from "#components/meta";
import { Card, CardBody, CardHeader, CardFooter } from "#components/cards";
import styles from "./card.module.scss";

import type { ICardProps } from "#components/cards";

interface TemplateCardProps extends ICardProps {
}

const TemplateCard = blockComponent<TemplateCardProps>(
  styles.block,
  ({ ...blockProps }) => {
    return (
      <Card {...blockProps}>
        <CardHeader></CardHeader>
        <CardBody></CardBody>
        <CardFooter></CardFooter>
      </Card>
    );
  }
);
