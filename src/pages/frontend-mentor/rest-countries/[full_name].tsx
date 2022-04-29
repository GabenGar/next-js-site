import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSEOTags } from "#lib/seo";
import { countriesByCodes, countryByName } from "#lib/api/rest-countries";
import { CardList } from "#components/lists";
import { ImageCarousel } from "#components/image-carousel";
import { FancyNumber, FancyArea } from "#components/number-view";
import { RESTCountries as Layout } from "#components/layout/frontend-mentor";
import { Page } from "#components/pages";
import { LinkExternal, LinkInternal } from "#components/links";
import { DL, DS, DD, DT } from "#components/lists/d-list";
import { CountryCard } from "#components/frontend-mentor";
import { isObjectEmpty } from "#lib/util";
import styles from "./[full_name].module.scss";

import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Country } from "#lib/api/rest-countries";
import type { BasePageProps } from "#types/pages";
import { createNextURL } from "#lib/language";

interface IProps extends BasePageProps {
  country: Country;
  borderCountries: Country[] | null;
}

interface IParams extends ParsedUrlQuery {
  full_name: string;
}

export default function RESTCountriesCountryDetail({
  localeInfo,
  country,
  borderCountries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("frontend-mentor");
  const countryName = country.name.official;
  const seoTags = createSEOTags({
    localeInfo,
    title: countryName,
    description: `Detailed info for ${countryName}`,
    canonicalPath: `/frontend-mentor/rest-countries/${countryName}`,
  });
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
    <Page seoTags={seoTags}>
      <article className={styles.info}>
        <header>
          <ImageCarousel images={images} className={styles.images} />

          <DL>
            {country?.capital && (
              <DS>
                <DT>Capital</DT>
                <DD className={styles.capital}>{country.capital}</DD> (
                <DD className={styles.capital}>
                  {country.capitalInfo?.latlng[0]}
                </DD>{" "}
                <DD className={styles.capital}>
                  {country.capitalInfo?.latlng[1]}
                </DD>
                )
              </DS>
            )}

            <DS>
              <DT>Other names</DT>
              {country.altSpellings ? (
                country.altSpellings.map((spelling) => (
                  <DD key={spelling}>{spelling}</DD>
                ))
              ) : (
                <DD>No other names</DD>
              )}
            </DS>
          </DL>
        </header>
        <section>
          <DL>
            <DS>
              <DT>Region</DT>
              <DD className={styles.region}>
                <LinkInternal
                  href={{
                    pathname:
                      "/frontend-mentor/rest-countries/regions/[region]",
                    query: { region: country.region },
                  }}
                >
                  {country.region}
                </LinkInternal>{" "}
                (
                <LinkInternal
                  href={{
                    pathname:
                      "/frontend-mentor/rest-countries/subregions/[subregion]",
                    query: { subregion: country.subregion },
                  }}
                >
                  {country.subregion}
                </LinkInternal>
                )
              </DD>
            </DS>

            <DS>
              <DT>Continents</DT>
              {country.continents.map((continent) => (
                <DD key={continent}>{continent}</DD>
              ))}
            </DS>

            <DS>
              <DT>Area</DT>
              <DD>
                <FancyArea number={country.area} />
              </DD>
            </DS>

            <DS>
              <DT>Timezones</DT>
              {country.timezones.map((tz) => (
                <DD key={tz}>{tz}</DD>
              ))}
            </DS>

            <DS>
              <DT>Coordinates</DT>
              <DD>{country.latlng[0]}</DD> <DD>{country.latlng[1]}</DD>
            </DS>

            <DS>
              <DT>Landlocked</DT>
              <DD>{country.landlocked ? "yes" : "no"}</DD>
            </DS>

            <DS>
              <DT>Maps</DT>
              {Object.entries(country.maps).map(([service, link]) => (
                <DD key={service.toLowerCase()}>
                  <LinkExternal href={link}>{service}</LinkExternal>
                </DD>
              ))}
            </DS>

            <DS>
              <DT>Population</DT>
              <DD>
                <FancyNumber number={country.population} />
              </DD>
            </DS>

            <DS>
              <DT>Week start</DT>
              <DD>
                {country.startOfWeek !== "turday"
                  ? country.startOfWeek
                  : `Sa${country.startOfWeek}`}
              </DD>
            </DS>

            <DS>
              <DT>Status</DT>
              <DD>{country.status}</DD>
            </DS>

            <DS>
              <DT>Languages</DT>
              {Object.entries(country.languages).map(([code, lang]) => (
                <Fragment key={code}>
                  <DD>{lang}</DD>{" "}
                </Fragment>
              ))}
            </DS>

            <DS>
              <DT>Independency Status</DT>
              {country.independent ? (
                <DD>Independent</DD>
              ) : (
                <DD>Not independent</DD>
              )}
            </DS>

            <DS>
              <DT>UN membership</DT>
              {country.unMember ? <DD>UN member</DD> : <DD>Not a UN member</DD>}
            </DS>

            <DS>
              <DT>Currencies</DT>
              {Object.entries(country.currencies).map(([id, currency]) => (
                <DD key={id}>
                  {currency.name} ({currency.symbol})
                </DD>
              ))}
            </DS>
          </DL>
        </section>
        <footer>
          <DL>
            <DS>
              <DT>Top Level Domain</DT>
              {country.tld.map((tld) => (
                <DD key={tld}>
                  <code>{tld}</code>
                </DD>
              ))}
            </DS>

            <DS className={styles.codes}>
              <DT className={styles.codes_term}>Codes</DT>
              <DD>
                <DL>
                  <DS>
                    <DT>cca2</DT>
                    <DD>{country.cca2}</DD>
                  </DS>
                  <DS>
                    <DT>cca3</DT>
                    <DD>{country.cca3}</DD>
                  </DS>
                  <DS>
                    <DT>ccn3</DT>
                    <DD>{country.ccn3}</DD>
                  </DS>
                  <DS>
                    <DT>cioc</DT>
                    <DD>{country.cioc}</DD>
                  </DS>
                  <DS>
                    <DT>fifa</DT>
                    <DD>{country.fifa}</DD>
                  </DS>
                </DL>
              </DD>
            </DS>
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
    </Page>
  );
}

RESTCountriesCountryDetail.getLayout = function getLayout(page: NextPage) {
  // @ts-expect-error fix type
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<IProps, IParams> = async ({
  locale,
  defaultLocale,
  params,
}) => {
  const { full_name } = params!;
  const country = await countryByName(full_name, true);

  if (!country) {
    return {
      notFound: true,
    };
  }

  const borderCountries = country.borders?.length
    ? await countriesByCodes(country.borders)
    : null;

  const localization = await serverSideTranslations(locale!, [
    "layout",
    "components",
    "frontend-mentor",
  ]);

  return {
    props: {
      ...localization,
      localeInfo: {
        locale: locale!,
        defaultLocale: defaultLocale!,
      },
      country,
      borderCountries,
    },
  };
};
