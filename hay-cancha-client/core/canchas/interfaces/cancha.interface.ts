export interface Cancha {
  _id:            string;
  name:           string;
  location:       Location;
  type:           string;
  price_per_hour: number;
  opening_hours:  OpeningHours;
  closing_time:   ClosingTime;
  state:          State;
  images:         string[];
  address:        Address;
  createdAt:      Date;
  updatedAt:      Date;
  __v:            number;
}

export interface Address {
  streetName:   StreetName;
  streetNumber: number;
  _id:          string;
}

export enum StreetName {
  AVSiempreViva = "Av. Siempre Viva",
}

export enum ClosingTime {
  The2200 = "22:00",
}

export enum Location {
  Belgrano = "Belgrano",
  Palermo = "Palermo",
}

export enum OpeningHours {
  The0800 = "08:00",
}

export enum State {
  Disponible = "disponible",
}
