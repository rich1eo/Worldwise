export interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: IPosition;
  id: number;
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

export enum ButtonType {
  Primary = 'primary',
  Back = 'back',
  Position = 'position',
}
