import { blockComponent } from "#components/meta";
import { ImageLink } from "#components/image-link";
import { FancyNumber, FancyArea } from "#components/number-view";
import { CardBase, CardHeader, CardBody, CardFooter } from "#components/cards";
import { DL, DLSection, DT, DD } from "#components/lists/d-list";
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
      <CardBase {...blockProps}>
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
              <DD>
                <FancyArea number={country.area} />
              </DD>
            </DLSection>
            <DLSection>
              <DT>Population</DT>
              <DD>
                <FancyNumber number={country.population} />
              </DD>
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
          <LinkInternal
            href={{
              pathname: "/frontend-mentor/rest-countries/[full_name]",
              query: { full_name: country.name.official },
            }}
          >
            Detailed Information
          </LinkInternal>
        </CardFooter>
      </CardBase>
    );
  }
);
