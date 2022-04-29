import {
  MOVED_PERMANENTLY,
  FOUND,
  SEE_OTHER,
  TEMPORARY_REDIRECT,
  PERMANENT_REDIRECT,
} from "#environment/constants/http";
import { ILocaleInfo } from "#lib/language";

const redirectStatuses = [
  MOVED_PERMANENTLY,
  FOUND,
  SEE_OTHER,
  TEMPORARY_REDIRECT,
  PERMANENT_REDIRECT,
] as const;

type IRedirectStatus = typeof redirectStatuses[number];

/**
 * Not extending the next `Redirect` because it's a type union and annoying to implement.
 */
interface IRedirect {
  destination: string;
  statusCode?: IRedirectStatus;
  basePath?: false;
}

/**
 * @TODO Locale-aware destination
 */
class Redirect implements IRedirect {
  destination: string;
  statusCode: IRedirectStatus;
  basePath: false;

  constructor(
    localeInfo: ILocaleInfo,
    destination: string,
    statusCode: IRedirectStatus = FOUND,
    basePath: false = false
  ) {
    this.destination = destination;
    this.statusCode = statusCode;
    this.basePath = basePath;
  }
}
