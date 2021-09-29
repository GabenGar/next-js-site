export async function fetcher(input: RequestInfo, init?: RequestInit): Promise<any> {
  const response = await fetch(input, init);
  const json = await response.json();
  return json;
}
