import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { restCountries as fetcher } from "#api/rest-countries";
import { ImageLink } from "#components";
import { Section } from "#components/page";
import { Picture, Anchour } from "#components/fancy";
import { DL, DLSection, DD, DT } from "#components/fancy/dl";
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
          <ImageLink
            href={country.flags.svg}
            src={country.flags.png}
            className={styles.flag}
            isLazy={false}
          />
          <ImageLink
            href={country.coatOfArms.svg}
            src={country.coatOfArms.png}
            className={styles.flag}
            isLazy={false}
          />
          <DL>
            <DLSection>
              <DT>Capital</DT>
              <DD>{country.capital}</DD> {"("}
              <DD>{country.capitalInfo.latlng[0]}</DD>{" "}
              <DD>{country.capitalInfo.latlng[1]}</DD>
              {")"}
            </DLSection>

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
              <DD className={styles.region}>{country.region}</DD>{" "}
              <DD>({country.subregion})</DD>
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
              <DT>Week start</DT>
              <DD>{country.startOfWeek}</DD>
            </DLSection>

            <DLSection>
              <DT>Population</DT>
              <DD>{country.population}</DD>
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
              <DD>
                <code>{country.tld}</code>
              </DD>
            </DLSection>

            <DLSection className={styles.codes}>
              <DT className={styles.codesTerm}>Codes</DT>
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
                    <DT>ccn2</DT>
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

            <DLSection>
              <DT>Borders</DT>
              {country.borders ? (
                country.borders.map((border) => (
                  <>
                    <DD key={border}>{border}</DD>{" "}
                  </>
                ))
              ) : (
                <DD>No borders</DD>
              )}
            </DLSection>
          </DL>
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
