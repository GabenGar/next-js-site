import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { restCountries as fetcher } from "#api/rest-countries";
import { CardList } from "#components";
import { Section } from "#components/page";
import {
  Picture,
  Anchour,
  DescriptionList,
  DescriptionSection,
  DescriptionTerm,
  DescriptionDetails,
} from "#components/fancy";
import { RESTCountries as Layout } from "#components/page";
import styles from "./index.module.scss";

import type { NextPage } from "next";
import type { API } from "#types/frontend-mentor/rest-countries";

export default function RESTCountriesPage() {
  const router = useRouter();
  const { name: countryName } = router.query;
  const { data, error } = useSWR<API.Country[]>(
    `https://restcountries.com/v3.1/name/${countryName}`,
    fetcher
  );

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data) {
    return <div>loading...</div>;
  }
  const country = data[0];

  return (
    <Section heading={`Detailed Info for ${countryName} ${country.flag}`}>
      <Head>
        <title>Detailed Info for {countryName}</title>
        <meta name="description" content={`Detailed info for ${countryName}`} />
      </Head>
      <article>
        <header>
          <div className={styles.flag}>
            <Anchour href={country.flags.svg}>
              <Picture src={country.flags.png} />
            </Anchour>
          </div>
          <div className={styles.flag}>
            <Anchour href={country.coatOfArms.svg}>
              <Picture src={country.coatOfArms.png} />
            </Anchour>
          </div>
          <DescriptionList>
            <DescriptionSection>
              <DescriptionTerm>Capital</DescriptionTerm>
              <DescriptionDetails>{country.capital}</DescriptionDetails>{" "}
              {"("}
              <DescriptionDetails>{country.capitalInfo.latlng[0]}</DescriptionDetails>{" "}
              <DescriptionDetails>{country.capitalInfo.latlng[1]}</DescriptionDetails>
              {")"}
            </DescriptionSection>

            {/* <DescriptionSection>
              <DescriptionTerm>Other names</DescriptionTerm>
              {country.altSpellings ? (
                country.altSpellings.map((spelling) => (
                  <DescriptionDetails key={spelling}>
                    {spelling}
                  </DescriptionDetails>
                ))
              ) : (
                <DescriptionDetails>No other names</DescriptionDetails>
              )}
            </DescriptionSection> */}
          </DescriptionList>
        </header>
        <section>
          <DescriptionList>
            <DescriptionSection>
              <DescriptionTerm>Region</DescriptionTerm>
              <DescriptionDetails className={styles.region}>
                {country.region}
              </DescriptionDetails>{" "}
              <DescriptionDetails>({country.subregion})</DescriptionDetails>
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Continents</DescriptionTerm>
              {country.continents.map((continent) => (
                <DescriptionDetails key={continent}>{continent}</DescriptionDetails>
              ))}
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Area</DescriptionTerm>
              <DescriptionDetails>{country.area}</DescriptionDetails>
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Timezones</DescriptionTerm>
              {country.timezones.map((tz) => (
                <DescriptionDetails key={tz}>{tz}</DescriptionDetails>
              ))}
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Coordinates</DescriptionTerm>
              <DescriptionDetails>{country.latlng[0]}</DescriptionDetails>{" "}
              <DescriptionDetails>{country.latlng[1]}</DescriptionDetails>
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Landlocked</DescriptionTerm>
              <DescriptionDetails>
                {country.landlocked ? "yes" : "no"}
              </DescriptionDetails>
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Maps</DescriptionTerm>
              {Object.entries(country.maps).map(([service, link]) => (
                <DescriptionDetails key={service.toLowerCase()}>
                  <Anchour href={link}>{service}</Anchour>
                </DescriptionDetails>
              ))}
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Week start</DescriptionTerm>
              <DescriptionDetails>{country.startOfWeek}</DescriptionDetails>
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Population</DescriptionTerm>
              <DescriptionDetails>{country.population}</DescriptionDetails>
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Status</DescriptionTerm>
              <DescriptionDetails>{country.status}</DescriptionDetails>
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Languages</DescriptionTerm>
              {Object.entries(country.languages).map(([code, lang]) => (
                <>
                  <DescriptionDetails key={code}>{lang}</DescriptionDetails>{" "}
                </>
              ))}
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Independency Status</DescriptionTerm>
              {country.independent ? (
                <DescriptionDetails>Independent</DescriptionDetails>
              ) : (
                <DescriptionDetails>Not independent</DescriptionDetails>
              )}
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>UN membership</DescriptionTerm>
              {country.unMember ? (
                <DescriptionDetails>UN member</DescriptionDetails>
              ) : (
                <DescriptionDetails>Not a UN member</DescriptionDetails>
              )}
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Currencies</DescriptionTerm>
              {Object.entries(country.currencies).map(([id, currency]) => (
                <DescriptionDetails key={id}>
                  {currency.name} ({currency.symbol})
                </DescriptionDetails>
              ))}
            </DescriptionSection>
          </DescriptionList>
        </section>
        <footer>
          <DescriptionList>
            <DescriptionSection>
              <DescriptionTerm>Top Level Domain</DescriptionTerm>
              <DescriptionDetails>
                <code>{country.tld}</code>
              </DescriptionDetails>
            </DescriptionSection>

            <DescriptionSection className={styles.codes}>
              <DescriptionTerm className={styles.codesTerm}>
                Codes
              </DescriptionTerm>
              <DescriptionDetails>
                <DescriptionList>
                  <DescriptionSection>
                    <DescriptionTerm>cca2</DescriptionTerm>
                    <DescriptionDetails>{country.cca2}</DescriptionDetails>
                  </DescriptionSection>
                  <DescriptionSection>
                    <DescriptionTerm>cca3</DescriptionTerm>
                    <DescriptionDetails>{country.cca3}</DescriptionDetails>
                  </DescriptionSection>
                  <DescriptionSection>
                    <DescriptionTerm>ccn2</DescriptionTerm>
                    <DescriptionDetails>{country.ccn3}</DescriptionDetails>
                  </DescriptionSection>
                  <DescriptionSection>
                    <DescriptionTerm>cioc</DescriptionTerm>
                    <DescriptionDetails>{country.cioc}</DescriptionDetails>
                  </DescriptionSection>
                  <DescriptionSection>
                    <DescriptionTerm>fifa</DescriptionTerm>
                    <DescriptionDetails>{country.fifa}</DescriptionDetails>
                  </DescriptionSection>
                </DescriptionList>
              </DescriptionDetails>
            </DescriptionSection>

            <DescriptionSection>
              <DescriptionTerm>Borders</DescriptionTerm>
              {country.borders ? (
                country.borders.map((border) => (
                  <>
                    <DescriptionDetails key={border}>
                      {border}
                    </DescriptionDetails>{" "}
                  </>
                ))
              ) : (
                <DescriptionDetails>No borders</DescriptionDetails>
              )}
            </DescriptionSection>
          </DescriptionList>
        </footer>
      </article>
      <ul>
        <li>- Click through to the border countries on the detail page</li>
      </ul>
    </Section>
  );
}

RESTCountriesPage.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};
