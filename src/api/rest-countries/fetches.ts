import { baseFetch } from "./base";

import type { Country } from "./types";

export async function allCountries() {
  const response = await baseFetch("v3.1/all", {
    method: "GET",
  });
  const countries: Country[] = await response.json();
  return countries;
}

export async function countryByName(name: string, isFullname = false) {
  const params = isFullname
    ? new URLSearchParams({ fullText: "true" })
    : undefined;
  const response = await baseFetch(
    `v3.1/name/${name}`,
    {
      method: "GET",
    },
    params
  );
  const countries: Country[] = await response.json();
  return countries[0];
}

export async function countriesByCodes(codes: string[]) {
  const params = new URLSearchParams({
    codes: codes.join(","),
  });
  const response = await baseFetch(
    "/v3.1/alpha",
    {
      method: "GET",
    },
    params
  );
  const countries: Country[] = await response.json();
  return countries;
}
