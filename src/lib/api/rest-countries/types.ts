export interface Country {
  altSpellings: string[];
  area: number;
  borders: string[];
  capital?: string[];
  capitalInfo?: Capital;
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc?: string;
  fifa?: string;
  currencies: { [name: string]: Currency };
  demonyms: { [name: string]: Demonym };
  flag: string;
  flags: { svg: string; png: string };
  coatOfArms: { svg: string; png: string } | Record<string,never>;
  idd: IDD;
  independent: boolean;
  landlocked: boolean;
  languages: { [name: string]: string };
  latlng: [number, number];
  maps: { googleMaps: string; openStreetMaps: string };
  name: Name;
  population: number;
  region: string;
  status: string;
  subregion: string;
  tld: string[];
  translations: { [name: string]: Translation };
  unMember: boolean;
  timezones: string[];
  continents: string[];
  startOfWeek: string;
}

export interface Capital {
  latlng: [number, number];
}
export interface Currency {
  name: string;
  symbol: string;
}
export interface Demonym {
  f: string;
  m: string;
}

export interface IDD {
  root: string;
  suffixes: string[];
}

export interface Name {
  common: string;
  official: string;
  nativeName: { [name: string]: { common: string; official: string } };
}

export interface Translation {
  official: string;
  common: string;
}
