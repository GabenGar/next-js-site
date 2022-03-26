import { useTranslation } from "next-i18next";
import { blockComponent } from "#components/meta";
import { Card, CardBody, CardHeader, CardFooter } from "./base";
import { Heading } from "#components/headings";
import { DL, DS } from "#components/lists/d-list";
import { DateTimeView } from "#components/dates";
import styles from "./account.module.scss";

import type { IAccountClient } from "#types/entities";
import type { ICardProps } from "./base";

export interface AccountCardCardProps extends ICardProps {
  account: IAccountClient;
}

export const AccountCard = blockComponent<AccountCardCardProps>(
  styles.block,
  ({ account, ...blockProps }) => {
    const { t } = useTranslation("components");
    const { name, email, created_at, updated_at, role } = account;

    return (
      <Card {...blockProps}>
        <CardHeader>
          <Heading level={2} className={styles.name}>
            {name}
          </Heading>
        </CardHeader>
        <CardBody>
          <DL>
            <DS dKey={t("account_last_activity")} dValue={updated_at} />
            <DS dKey={t("account_role")} dValue={role} />
            <DS dKey={t("account_email")} dValue={email} />
          </DL>
        </CardBody>
        <CardFooter>
          <DL>
            <DS
              dKey={t("account_joined_at")}
              dValue={created_at && <DateTimeView dateTime={created_at} />}
            />
          </DL>
        </CardFooter>
      </Card>
    );
  }
);
