import { useTranslation } from "next-i18next";
import { blockComponent } from "#components/meta";
import { Card, CardBody, CardHeader, CardFooter } from "#components/cards";
import { Heading } from "#components/headings";
import { DateTimeView } from "#components/dates";
import { LinkInternal } from "#components/links";
import { DL, DS } from "#components/lists/d-list";
import styles from "./card.module.scss";

import type { IAccountProfileClient } from "#types/entities";
import type { ICardProps } from "#components/cards";
import { Image } from "#components/images";

export interface IProfileCardProps extends ICardProps {
  profile: IAccountProfileClient;
}

export const ProfileCard = blockComponent<IProfileCardProps>(
  styles.block,
  Component
);

function Component({
  profile,
  headingLevel = 2,
  ...blockProps
}: IProfileCardProps) {
  const { t } = useTranslation("components");
  const { id, created_at, updated_at, full_name, avatar_url } = profile;

  return (
    <Card {...blockProps}>
      <CardHeader>
        <Heading level={headingLevel}>
          {full_name ?? t("profile_anonymous")}
        </Heading>
        {avatar_url && <Image src={avatar_url} imageHeight="10em" />}
      </CardHeader>
      <CardBody>
        <DL>
          <DS
            dKey={t("profile_joined")}
            dValue={<DateTimeView dateTime={created_at} />}
          />
          <DS
            dKey={t("profile_last_activity")}
            dValue={<DateTimeView dateTime={updated_at} />}
          />
        </DL>
      </CardBody>
      <CardFooter>
        <LinkInternal
          href={{
            pathname: "/profile/[id]",
            query: { id },
          }}
        >
          {t("profile_details")}
        </LinkInternal>
      </CardFooter>
    </Card>
  );
}
