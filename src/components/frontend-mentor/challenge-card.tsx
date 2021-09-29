import { useClassName } from "#lib/hooks";
import { CardBase, CardHeader, CardBody, CardFooter } from "#components/cards";
import { LocalAnchour, Anchour, Picture } from "#components/fancy";
import styles from "./challenge-card.module.scss";

import type { Challenge, ElementProps } from "#types";

interface Props extends ElementProps<HTMLElement> {
  challenge: Challenge
}

export function ChallengeCard({ challenge, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (<CardBase className={blockClass} {...blockProps}>
    <CardHeader>
      <h2 className={styles.title}>{challenge.title}</h2>
    </CardHeader>
    <CardBody>
      <Picture src={challenge.image} />
    </CardBody>
    <CardFooter>
      <p>
        <LocalAnchour href={`/frontend-mentor/${challenge.localLink}`}>
          Go to the page
        </LocalAnchour>
      </p>
      <p>
        <Anchour href={challenge.link}>
          Original page
        </Anchour>
      </p>
    </CardFooter>
  </CardBase>);
}
