import { toJSON } from "#lib/json";
import { ProjectError } from "./lib";

interface IFetchData {
  res: Response;
  req?: RequestInit;
}

export class FetchError extends ProjectError {
  res: Response;
  req?: RequestInit;

  name = "FetchError";

  /**
   * Alternative async  constructor.
   */
  static async async(
    fetchData: IFetchData,
    options?: ErrorOptions,
    ...params: any[]
  ) {
    let resBody;
    try {
      resBody = await fetchData.res.json();
    } catch (error) {
      resBody = await fetchData.res.text();
    }

    return new this(fetchData, resBody, options, ...params);
  }

  constructor(
    fetchData: IFetchData,
    body?: string,
    options?: ErrorOptions,
    ...params: any[]
  ) {
    const { req, res } = fetchData;
    const message = [
      `Request: ${req?.method ? req.method : ""} ${res.url}`,
      `Status: ${res.status}`,
      `Message: ${res.statusText}`,
      `Headers: ${toJSON(Object.fromEntries(res.headers))}`,
      body && `Body: ${body}`,
    ].join("\n");
    super(message, options, ...params);
    this.req = req;
    this.res = res;
  }
}
