import { createFetch } from "#browser";

const origin = "https://restcountries.com";

export const baseFetch = createFetch(origin);
