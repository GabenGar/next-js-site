import { useTranslation } from "next-i18next";
import { blockComponent } from "#components/meta";
import { Card, CardHeader, CardBody, CardFooter } from "#components/cards";
import { FancyImageExternal } from "#components/fancy";
import { LinkExternal, LinkInternal } from "#components/links";
import styles from "./challenge-card.module.scss";

import type { Challenge } from "#types/frontend-mentor";
import type { ICardProps } from "#components/cards";

interface Props extends ICardProps {
  challenge: Challenge;
}

export const ChallengeCard = blockComponent<Props>(
  styles.block,
  ({ challenge, ...blockProps }) => {
    const { t } = useTranslation("frontend-mentor");

    return (
      <Card {...blockProps}>
        <CardHeader>
          <h2 className={styles.title}>{challenge.title}</h2>
        </CardHeader>
        <CardBody>
          <FancyImageExternal src={challenge.image} />
        </CardBody>
        <CardFooter>
          <p>
            <LinkInternal href={`/frontend-mentor/${challenge.localLink}`}>
              {t("challenge_internal")}
            </LinkInternal>
          </p>
          <p>
            <LinkExternal href={challenge.link}>
              {t("challenge_external")}
            </LinkExternal>
          </p>
        </CardFooter>
      </Card>
    );
  }
);
