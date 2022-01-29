import { createFetch } from "#lib/util";

const origin = "https://restcountries.com";

export const baseFetch = createFetch(origin);
