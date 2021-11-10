import Head from "next/head";
import { countriesByCodes, countryByName } from "#api/rest-countries";
import { CardList, ImageCarousel, FancyNumber, FancyArea } from "#components";
import { Section, RESTCountries as Layout } from "#components/page";
import { Anchour } from "#components/fancy";
import { DL, DLSection, DD, DT } from "#components/fancy/dl";
import { CountryCard } from "#components/frontend-mentor";
import { isObjectEmpty } from "#lib/util";
import styles from "./[full_name].module.scss";

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Country } from "#api/rest-countries";

interface Props {
  country: Country;
  borderCountries?: Country[];
}

interface Params extends ParsedUrlQuery {
  full_name: string;
}

export default function RESTCountriesCountryDetail({
  country,
  borderCountries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const countryName = country.name.official;
  const images = [
    { src: country.flags.png, href: country.flags.svg, caption: "Flag" },
  ];

  if (!isObjectEmpty(country.coatOfArms)) {
    images.push({
      src: country.coatOfArms.png,
      href: country.coatOfArms.svg,
      caption: "Coat of Arms",
    });
  }

  return (
    <Section heading={`${countryName}`}>
      <Head>
        <title>Detailed Info for {countryName}</title>
        <meta name="description" content={`Detailed info for ${countryName}`} />
      </Head>
      <article className={styles.info}>
        <header>
          <ImageCarousel images={images} className={styles.images} />

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
              <DD>
                <FancyArea number={country.area} />
              </DD>
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
              <DD>
                <FancyNumber number={country.population} />
              </DD>
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

  const borderCountries = country.borders.length
    ? await countriesByCodes(country.borders)
    : undefined;

  return {
    props: { country, borderCountries },
  };
};
