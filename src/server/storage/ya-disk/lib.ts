import { createFetch } from "#browser";
const baseURL = "https://webdav.yandex.com:443";

const customFetch = createFetch(baseURL);

export async function fetchDisk() {
  const headers = new Headers({})

  const response = await customFetch("/v1/disk", {
    headers
  });


}
