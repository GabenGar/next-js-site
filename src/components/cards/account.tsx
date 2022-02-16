import { blockComponent } from "#components/meta";
import { Card, CardBody, CardHeader, CardFooter } from "./base";
import { Heading } from "#components/headings";
import {
  DL,
  DD,
  DS,
  DT,
} from "#components/lists/d-list";
import styles from "./account.module.scss";

import type { Account } from "#types/entities";
import type { ICardProps } from "./base";

export interface AccountCardCardProps extends ICardProps {
  account: Account;
}

export const AccountCard = blockComponent<AccountCardCardProps>(
  styles.block,
  ({ account, ...blockProps }) => {
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
            <DS dKey="Last activity" dValue={updated_at} />
            <DS dKey="Role" dValue={role} />
            <DS dKey="Email" dValue={email} />
          </DL>
        </CardBody>
        <CardFooter>
          <DL>
            <DS dKey="Joined at" dValue={created_at} />
          </DL>
        </CardFooter>
      </Card>
    );
  }
);
