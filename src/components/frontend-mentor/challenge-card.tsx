import { useClassName } from "#lib/hooks";
import { CardBase, CardHeader, CardBody, CardFooter } from "#components/cards";
import { LocalAnchour } from "#components/fancy";
import styles from "./challenge-card.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLElement> {
  challenge: {}
}

export function ChallengeCard({ challenge, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);
  const { title, link } = challenge

  return (<CardBase className={blockClass} {...blockProps}>
    <CardHeader>
      <h2 className={styles.title}>{challenge.title}</h2>
    </CardHeader>
    <CardBody>

    </CardBody>
    <CardFooter>
      <LocalAnchour href={challenge.link}>
        Go to the page
      </LocalAnchour>
    </CardFooter>
  </CardBase>);
}
