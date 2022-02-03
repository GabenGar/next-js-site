import { blockComponent } from "#components/meta";
import { ImageLink } from "#components/image-link";
import { FancyNumber, FancyArea } from "#components/number-view";
import { Card, CardHeader, CardBody, CardFooter } from "#components/cards";
import { DL, DS, DT, DD } from "#components/lists/d-list";
import { LinkInternal } from "#components/links";
import styles from "./country-card.module.scss";

import type { CardProps } from "#components/cards";
import type { Country } from "#lib/api/rest-countries";

interface Props extends CardProps {
  country: Country;
}

export const CountryCard = blockComponent<Props>(
  styles.block,
  ({ country, ...blockProps }) => {
    return (
      <Card {...blockProps}>
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
            <DS>
              <DT>Capital</DT>
              <DD>{country.capital}</DD>
            </DS>
            <DS>
              <DT>Area</DT>
              <DD>
                <FancyArea number={country.area} />
              </DD>
            </DS>
            <DS>
              <DT>Population</DT>
              <DD>
                <FancyNumber number={country.population} />
              </DD>
            </DS>
            <DS>
              <DT>Currencies</DT>
              {country.currencies &&
                Object.entries(country.currencies).map(([name, currency]) => (
                  <DD key={name}>
                    {currency.name} ({currency.symbol})
                  </DD>
                ))}
            </DS>
          </DL>
        </CardBody>
        <CardFooter>
          <LinkInternal
            href={{
              pathname: "/frontend-mentor/rest-countries/[full_name]",
              query: { full_name: country.name.official },
            }}
          >
            Detailed Information
          </LinkInternal>
        </CardFooter>
      </Card>
    );
  }
);
