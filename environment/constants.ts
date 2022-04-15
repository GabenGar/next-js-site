import path from "path";

export const ERROR_MESSAGE = "FLYING POLAR BUFFALO ERROR";

export const PROJECT_ROOT = process.cwd();
export const SCHEMA_FOLDER = path.join(PROJECT_ROOT, "schema");
export const CONFIGS_FOLDER = path.join(PROJECT_ROOT, "configs");
export const SOURCE_FOLDER = path.join(PROJECT_ROOT, "src");
export const CODEGEN_FOLDER = path.join(SOURCE_FOLDER, "codegen");
export const BLOGS_FOLDER = path.join(SOURCE_FOLDER, "assets", "blog");

/**
 * @link https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier
 */
export enum ES_UNITS {
  ACRE = "acre",
  BIT = "bit",
  BYTE = "byte",
  CELSIUS = "celsius",
  CENTIMETER = "centimeter",
  DAY = "day",
  DEGREE = "degree",
  fahrenheit = "fahrenheit",
  FLUID_OUNCE = "fluid-ounce",
  foot = "foot",
  gallon = "gallon",
  GIGABIT = "gigabit",
  GIGABYTE = "gigabyte",
  GRAM = "gram",
  hectare = "hectare",
  HOUR = "hour",
  INCH = "inch",
  KILOBIT = "kilobit",
  KILOBYT = "kilobyte",
  KILOGRAM = "kilogram",
  KILOMETER = "kilometer",
  LITER = "liter",
  MEGABIT = "megabit",
  MEGABYTE = "megabyte",
  METER = "meter",
  MILE = "mile",
  MILE_SCANDINAVIAN = "mile-scandinavian",
  milliliter = "milliliter",
  millimeter = "millimeter",
  millisecond = "millisecond",
  minute = "minute",
  month = "month",
  ounce = "ounce",
  percent = "percent",
  petabyte = "petabyte",
  pound = "pound",
  second = "second",
  stone = "stone",
  terabit = "terabit",
  terabyte = "terabyte",
  week = "week",
  yard = "yard",
  year = "year",
}

export const urlProtocols = [
  "aaa",
  "about",
  "acap",
  "acct",
  "acr",
  "adiumxtra",
  "afp",
  "afs",
  "aim",
  "apt",
  "attachment",
  "aw",
  "amss",
  "barion",
  "beshare",
  "bitcoin",
  "blob",
  "bolo",
  "callto",
  "cap",
  "chrome",
  "chrome-extension",
  "cid",
  "coap",
  "coaps",
  "content",
  "crid",
  "cvs",
  "dab",
  "data",
  "dav",
  "dict",
  "dlna-playsingle",
  "dlna-playcontainer",
  "dns",
  "dntp",
  "drm",
  "dtn",
  "dvb",
  "ed2k",
  "example",
  "facetime",
  "fax",
  "feed",
  "file",
  "filesystem",
  "finger",
  "fish",
  "fm",
  "ftp",
  "gemini",
  "geo",
  "gg",
  "git",
  "gizmoproject",
  "go",
  "gopher",
  "gtalk",
  "h323",
  "hcp",
  "http",
  "https",
  "iax",
  "icap",
  "icon",
  "im",
  "imap",
  "info",
  "iotdisco",
  "ipn",
  "ipp",
  "ipps",
  "irc",
  "irc6",
  "ircs",
  "iris",
  "iris.beep",
  "iris.xpc",
  "iris.xpcs",
  "iris.lws",
  "itms",
  "jabber",
  "jar",
  "jms",
  "keyparc",
  "lastfm",
  "ldap",
  "ldaps",
  "magnet",
  "mailserver",
  "mailto",
  "maps",
  "market",
  "message",
  "mid",
  "mms",
  "modem",
  "ms-help",
  "ms-settings",
  "ms-settings-airplanemode",
  "ms-settings-bluetooth",
  "ms-settings-camera",
  "ms-settings-cellular",
  "ms-settings-cloudstorage",
  "ms-settings-emailandaccounts",
  "ms-settings-language",
  "ms-settings-location",
  "ms-settings-lock",
  "ms-settings-nfctransactions",
  "ms-settings-notifications",
  "ms-settings-power",
  "ms-settings-privacy",
  "ms-settings-proximity",
  "ms-settings-screenrotation",
  "ms-settings-wifi",
  "ms-settings-workplace",
  "msnim",
  "msrp",
  "msrps",
  "mtqp",
  "mumble",
  "mupdate",
  "mvn",
  "news",
  "nfs",
  "ni",
  "nih",
  "nntp",
  "notes",
  "oid",
  "opaquelocktoken",
  "openpgp4fpr",
  "pack",
  "palm",
  "paparazzi",
  "payto",
  "pkcs11",
  "platform",
  "pop",
  "pres",
  "prospero",
  "proxy",
  "psyc",
  "query",
  "redis",
  "rediss",
  "reload",
  "res",
  "resource",
  "rmi",
  "rsync",
  "rtmfp",
  "rtmp",
  "rtsp",
  "s3",
  "secondlife",
  "service",
  "session",
  "sftp",
  "sgn",
  "shc",
  "shttp",
  "sieve",
  "sip",
  "sips",
  "skype",
  "smb",
  "sms",
  "snews",
  "snmp",
  "soap.beep",
  "soap.beeps",
  "soldat",
  "spotify",
  "ssh",
  "steam",
  "stun",
  "stuns",
  "svn",
  "tag",
  "teamspeak",
  "tel",
  "telnet",
  "tftp",
  "things",
  "thismessage",
  "tn3270",
  "tip",
  "turn",
  "turns",
  "tv",
  "udp",
  "udp",
  "unreal",
  "urn",
  "ut2004",
  "vemmi",
  "ventrilo",
  "videotex",
  "view-source",
  "vnc",
  "wais",
  "webcal",
  "ws",
  "wss",
  "wtai",
  "wyciwyg",
  "xcon",
  "xcon-userid",
  "xfire",
  "website",
  "xmlrpc.beep",
  "xmlrpc.beeps",
  "xmpp",
  "xri",
  "ymsgr",
  "z39.50r",
] as const;

/**
 * @link https://en.wikipedia.org/wiki/List_of_URI_schemes
 */
export type IURLProtocols = typeof urlProtocols[number];
