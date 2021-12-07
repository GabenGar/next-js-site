import { blockComponent } from "#components";
import { CardBase, CardHeader, CardBody, CardFooter } from "#components/cards";
import { Anchour, FancyImageExternal, InternalAnchour } from "#components/fancy";
import styles from "./challenge-card.module.scss";

import type { Challenge, BlockProps } from "#types";

interface Props extends BlockProps<"article"> {
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
            <InternalAnchour href={`/frontend-mentor/${challenge.localLink}`}>
              Go to the page
            </InternalAnchour>
          </p>
          <p>
            <Anchour href={challenge.link}>Original page</Anchour>
          </p>
        </CardFooter>
      </CardBase>
    );
  }
);
