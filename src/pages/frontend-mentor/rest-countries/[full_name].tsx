import Head from "next/head";
import { countriesByCodes, countryByName } from "#api/rest-countries";
import { ImageLink, CardList } from "#components";
import { Section, RESTCountries as Layout } from "#components/page";
import { Anchour, Button } from "#components/fancy";
import { DL, DLSection, DD, DT } from "#components/fancy/dl";
import { CountryCard } from "#components/frontend-mentor";
import { buttonClicked } from "#lib/util";
import styles from "./[full_name].module.scss";

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { MouseEvent } from "react";
import type { ParsedUrlQuery } from "querystring";
import type { Country } from "#api/rest-countries";

interface Props {
  country: Country;
  borderCountries: Country[];
}

interface Params extends ParsedUrlQuery {
  full_name: string;
}

export default function RESTCountriesCountryDetail({
  country,
  borderCountries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const countryName = country.name.official;

  function switchImage(
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    event.stopPropagation();
    const button = buttonClicked(event, styles.button);

    if (
      !button ||
      (!button.previousElementSibling && !button.nextElementSibling)
    ) {
      return;
    }

    const shownImage = event.currentTarget.querySelector(
      styles.image_shown
    ) as HTMLElement;
    const nextImage = (
      button.value == "previous"
        ? button.previousElementSibling
        : button.nextElementSibling
    ) as HTMLElement;

    shownImage.classList.remove(styles.image_shown);
    nextImage.classList.add(styles.image_shown);
  }

  return (
    <Section heading={`${countryName}`}>
      <Head>
        <title>Detailed Info for {countryName}</title>
        <meta name="description" content={`Detailed info for ${countryName}`} />
      </Head>
      <article className={styles.info}>
        <header>
          <div className={styles.images} onClick={switchImage}>
            <div className={styles.list}>
              <figure className={`${styles.image} ${styles.image_shown}`}>
                <figcaption>Flag</figcaption>
                <ImageLink
                  href={country.flags.svg}
                  src={country.flags.png}
                  className={styles.flag}
                  isLazy={false}
                />
              </figure>
              <figure className={styles.image}>
                <figcaption>Coat of Arms</figcaption>
                <ImageLink
                  href={country.coatOfArms.svg}
                  src={country.coatOfArms.png}
                  className={styles.flag}
                  isLazy={false}
                />
              </figure>
            </div>
            <div className={styles.buttons}>
              <Button className={styles.button} value="previous">
                Previous
              </Button>
              <Button className={styles.button} value="next">
                Next
              </Button>
            </div>
          </div>

          <DL>
            {country?.capital && (
              <DLSection>
                <DT>Capital</DT>
                <DD className={styles.capital}>{country.capital}</DD> (
                <DD className={styles.capital}>
                  {country.capitalInfo?.latlng[0]}
                </DD>{" "}
                <DD className={styles.capital}>
                  {country.capitalInfo?.latlng[1]}
                </DD>
                )
              </DLSection>
            )}

            <DLSection>
              <DT>Other names</DT>
              {country.altSpellings ? (
                country.altSpellings.map((spelling) => (
                  <DD key={spelling}>{spelling}</DD>
                ))
              ) : (
                <DD>No other names</DD>
              )}
            </DLSection>
          </DL>
        </header>
        <section>
          <DL>
            <DLSection>
              <DT>Region</DT>
              <DD className={styles.region}>
                <span>{country.region}</span> (<span>{country.subregion}</span>)
              </DD>
            </DLSection>

            <DLSection>
              <DT>Continents</DT>
              {country.continents.map((continent) => (
                <DD key={continent}>{continent}</DD>
              ))}
            </DLSection>

            <DLSection>
              <DT>Area</DT>
              <DD>{country.area}</DD>
            </DLSection>

            <DLSection>
              <DT>Timezones</DT>
              {country.timezones.map((tz) => (
                <DD key={tz}>{tz}</DD>
              ))}
            </DLSection>

            <DLSection>
              <DT>Coordinates</DT>
              <DD>{country.latlng[0]}</DD> <DD>{country.latlng[1]}</DD>
            </DLSection>

            <DLSection>
              <DT>Landlocked</DT>
              <DD>{country.landlocked ? "yes" : "no"}</DD>
            </DLSection>

            <DLSection>
              <DT>Maps</DT>
              {Object.entries(country.maps).map(([service, link]) => (
                <DD key={service.toLowerCase()}>
                  <Anchour href={link}>{service}</Anchour>
                </DD>
              ))}
            </DLSection>

            <DLSection>
              <DT>Population</DT>
              <DD>{country.population}</DD>
            </DLSection>

            <DLSection>
              <DT>Week start</DT>
              <DD>
                {country.startOfWeek !== "turday"
                  ? country.startOfWeek
                  : `Sa${country.startOfWeek}`}
              </DD>
            </DLSection>

            <DLSection>
              <DT>Status</DT>
              <DD>{country.status}</DD>
            </DLSection>

            <DLSection>
              <DT>Languages</DT>
              {Object.entries(country.languages).map(([code, lang]) => (
                <>
                  <DD key={code}>{lang}</DD>{" "}
                </>
              ))}
            </DLSection>

            <DLSection>
              <DT>Independency Status</DT>
              {country.independent ? (
                <DD>Independent</DD>
              ) : (
                <DD>Not independent</DD>
              )}
            </DLSection>

            <DLSection>
              <DT>UN membership</DT>
              {country.unMember ? <DD>UN member</DD> : <DD>Not a UN member</DD>}
            </DLSection>

            <DLSection>
              <DT>Currencies</DT>
              {Object.entries(country.currencies).map(([id, currency]) => (
                <DD key={id}>
                  {currency.name} ({currency.symbol})
                </DD>
              ))}
            </DLSection>
          </DL>
        </section>
        <footer>
          <DL>
            <DLSection>
              <DT>Top Level Domain</DT>
              {country.tld.map((tld) => (
                <DD key={tld}>
                  <code>{tld}</code>
                </DD>
              ))}
            </DLSection>

            <DLSection className={styles.codes}>
              <DT className={styles.codes_term}>Codes</DT>
              <DD>
                <DL>
                  <DLSection>
                    <DT>cca2</DT>
                    <DD>{country.cca2}</DD>
                  </DLSection>
                  <DLSection>
                    <DT>cca3</DT>
                    <DD>{country.cca3}</DD>
                  </DLSection>
                  <DLSection>
                    <DT>ccn3</DT>
                    <DD>{country.ccn3}</DD>
                  </DLSection>
                  <DLSection>
                    <DT>cioc</DT>
                    <DD>{country.cioc}</DD>
                  </DLSection>
                  <DLSection>
                    <DT>fifa</DT>
                    <DD>{country.fifa}</DD>
                  </DLSection>
                </DL>
              </DD>
            </DLSection>
          </DL>
          <h2>Borders</h2>
          {borderCountries ? (
            <>
              <p>A total of {borderCountries.length} bordering countries.</p>
              <CardList>
                {borderCountries.map((country) => (
                  <CountryCard key={country.cca3} country={country} />
                ))}
              </CardList>
            </>
          ) : (
            <p>No borders</p>
          )}
        </footer>
      </article>
    </Section>
  );
}

RESTCountriesCountryDetail.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
  const { full_name } = context.params!;
  const country = await countryByName(full_name, true);

  if (!country) {
    return {
      notFound: true,
    };
  }

  const borderCountries = await countriesByCodes(country.borders);

  return {
    props: { country, borderCountries },
  };
};
