////////////////////////////////////////////
// Cities Context Types

export type CitiesContextType = {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity | null;
  error: string;
  getCity(id: string): void;
  createCity(newCity: ICityPost): void;
  deleteCity(id: number): void;
};

export type CitiesReducerType = {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity | null;
  error: string;
};

export type CitiesAction =
  | {
      type: CitiesActionType.Loading;
    }
  | {
      type: CitiesActionType.CitiesLoaded;
      payload: ICity[];
    }
  | {
      type: CitiesActionType.CityCreated;
      payload: ICity;
    }
  | {
      type: CitiesActionType.CityDeleted;
      payload: number;
    }
  | {
      type: CitiesActionType.Rejected;
      payload: string;
    }
  | {
      type: CitiesActionType.CityLoaded;
      payload: ICity;
    };

export enum CitiesActionType {
  Loading = 'loading',
  CitiesLoaded = 'cities/loaded',
  CityCreated = 'cities/created',
  CityDeleted = 'cities/deleted',
  Rejected = 'rejected',
  CityLoaded = 'city/loaded',
}

////////////////////////////////////////////
// Auth Context Types

export type AuthContextType = {
  user: IUser | null;
  isAuthenticated: boolean;
  login(email: string, password: string): void;
  logout(): void;
};

export type AuthStateType = {
  user: IUser | null;
  isAuthenticated: boolean;
};

export type AuthAction =
  | {
      type: AuthActionType.Login;
      payload: IUser;
    }
  | { type: AuthActionType.Logout };

export enum AuthActionType {
  Login = 'login',
  Logout = 'logout',
}

////////////////////////////////////////////
// User Types

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

////////////////////////////////////////////
// City/Country Types

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
