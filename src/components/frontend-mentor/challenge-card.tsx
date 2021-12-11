import { blockComponent } from "#components";
import { CardBase, CardHeader, CardBody, CardFooter } from "#components/cards";
import { FancyImageExternal } from "#components/fancy";
import { LinkExternal, LinkInternal } from "#components/links";
import styles from "./challenge-card.module.scss";

import type { Challenge } from "#types";
import type { CardProps } from "#components/cards";

interface Props extends CardProps {
  challenge: Challenge;
}

export const ChallengeCard = blockComponent<Props>(
  styles.block,
  ({ challenge, ...blockProps }) => {
    return (
      <CardBase {...blockProps}>
        <CardHeader>
          <h2 className={styles.title}>{challenge.title}</h2>
        </CardHeader>
        <CardBody>
          <FancyImageExternal src={challenge.image} />
        </CardBody>
        <CardFooter>
          <p>
            <LinkInternal href={`/frontend-mentor/${challenge.localLink}`}>
              Go to the page
            </LinkInternal>
          </p>
          <p>
            <LinkExternal href={challenge.link}>Original page</LinkExternal>
          </p>
        </CardFooter>
      </CardBase>
    );
  }
);
