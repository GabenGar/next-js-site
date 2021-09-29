import { useClassName } from "#lib/hooks";
import { CardBase, CardHeader, CardBody, CardFooter } from "#components/cards";
import { LocalAnchour, Anchour, Picture } from "#components/fancy";
import styles from "./country-card.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLElement> {
  country: {}
}

export function CountryCard({ country, className, ...blockProps }: Props) {

  return (<CardBase className={useClassName(styles.block, className)} {...blockProps}>
    <CardHeader>
      <h2 className={styles.title}>{}</h2>
    </CardHeader>
    <CardBody>
    </CardBody>
    <CardFooter>
    </CardFooter>
  </CardBase>);
}
