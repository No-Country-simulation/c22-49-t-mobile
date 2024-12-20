export type RootStackParamList = {
  Home: undefined;
  details: { court: Court };
};

export type Court = {
  name: string;
  location: string;
  price: number;
  players: number;
  sport: string;
  image: any;
};
