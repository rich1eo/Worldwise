export interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: IPosition;
  id: number;
}

export interface ICityPost {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: IPosition;
}

export interface ICountry {
  id: number;
  country: string;
  emoji: string;
}

export interface IPosition {
  lat: number;
  lng: number;
}

export type PositionArr = [lat: number, lng: number];

////////////////////////////////////////////
// UI

export enum ButtonType {
  Primary = 'primary',
  Back = 'back',
  Position = 'position',
}

////////////////////////////////////////////
// Form Country Fetch Data
export interface IFetchCountry {
  latitude: number;
  longitude: number;
  continent: string;
  lookupSource: string;
  continentCode: string;
  localityLanguageRequested: string;
  city: string;
  countryName: string;
  countryCode: string;
  postcode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  plusCode: string;
  locality: string;
  localityInfo: ILocalityInfo;
}

export interface ILocalityInfo {
  LikelyLand: boolean;
  administrative: IAdministrative[];
  informative: IInformative[];
}

export interface IAdministrative {
  name: string;
  description: string;
  order: number;
  adminLevel: number;
  isoCode?: string;
  wikidataId: string;
  geonameId?: number;
}

export interface IInformative {
  name: string;
  description: string;
  order: number;
  isoCode?: string;
  wikidataId?: string;
  geonameId?: number;
}
