import { Country } from "#api/rest-countries";
import { useClassName } from "#lib/hooks";
import { ImageLink } from "#components";
import { CardBase, CardHeader, CardBody, CardFooter } from "#components/cards";
import { LocalAnchour } from "#components/fancy";
import { DL, DLSection, DT, DD } from "#components/fancy/dl";
import styles from "./country-card.module.scss";

import type { ElementProps } from "#types";

interface Props extends ElementProps<HTMLElement> {
  country: Country;
}

export function CountryCard({ country, className, ...blockProps }: Props) {
  const blockClass = useClassName(styles.block, className);

  return (
    <CardBase className={blockClass} {...blockProps}>
      <CardHeader>
        <h2 className={styles.title}>{country.name.common}</h2>
        <ImageLink
          href={country.flags.svg}
          src={country.flags.png}
          className={styles.flag}
        />
      </CardHeader>
      <CardBody>
        <DL className={styles.details}>
          <DLSection>
            <DT>Capital</DT>
            <DD>{country.capital}</DD>
          </DLSection>
          <DLSection>
            <DT>Area</DT>
            <DD>{country.area}</DD>
          </DLSection>
          <DLSection>
            <DT>Population</DT>
            <DD>{country.population}</DD>
          </DLSection>
          <DLSection>
            <DT>Currencies</DT>
            {country.currencies &&
              Object.entries(country.currencies).map(([name, currency]) => (
                <DD key={name}>
                  {currency.name} ({currency.symbol})
                </DD>
              ))}
          </DLSection>
        </DL>
      </CardBody>
      <CardFooter>
        <LocalAnchour
          href={{
            pathname: "/frontend-mentor/rest-countries/[full_name]",
            query: { full_name: country.name.official },
          }}
        >
          Detailed Information
        </LocalAnchour>
      </CardFooter>
    </CardBase>
  );
}
