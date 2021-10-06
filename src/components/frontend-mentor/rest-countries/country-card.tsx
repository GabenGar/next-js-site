import { useClassName } from "#lib/hooks";
import { CardBase, CardHeader, CardBody, CardFooter } from "#components/cards";
import { LocalAnchour, Anchour, Picture } from "#components/fancy";
import { API } from "#types/frontend-mentor/rest-countries";
import styles from "./country-card.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLElement> {
  country: API.Country
}

export function CountryCard({ country, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (<CardBase className={blockClass} {...blockProps}>
    <CardHeader>
      <h2 className={styles.title}>
        <span>{country.name.common}</span>
        <span>({country.name.official})</span>
      </h2>
      <p className={styles.spellings}>
        {country?.altSpellings.map((spell, index) => (
          <span
            key={index} className={styles.spelling}
          >{spell}</span>
        ))}
      </p>
    </CardHeader>
    <CardBody>
      <dl>
        <div className={styles.stat}>
          <dt>Capital</dt>
          <dd>{country.capital}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Area</dt>
          <dd>{country.area}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Currencies</dt>
          {Object.entries(country.currencies).map(([name, currency]) => (
            <dd key={name}>{currency.name}({currency.symbol})</dd>
          ))}
        </div>
      </dl>
    </CardBody>
    <CardFooter>
      <LocalAnchour href={{
        pathname: "/frontend-mentor/rest-countries/[name]",
        query: { name: country.name.common }
      }}>
        Detailed Information
      </LocalAnchour>
    </CardFooter>
  </CardBase>);
}
