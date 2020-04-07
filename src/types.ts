import { Wiki_Fish } from './../scripts/extract/types';
export interface SeasonalCritter {
  name: string;
  imageName: string | null;
  price: number;
  location: string;
  time: string;
  // eslint-disable-next-line prettier/prettier
  appearsInMonths: ReadonlyArray<'Jan'|'Feb'|'Mar'|'Apr'|'May'|'Jun'|'Jul'|'Aug'|'Sep'|'Oct'|'Nov'|'Dec'>;
}

export interface Fish extends SeasonalCritter {
  shadowSize: Wiki_Fish['Shadow size']['text'];
}

export type Bug = SeasonalCritter;

export interface Price {
  amount: number;
  currency: string;
}

export interface Furniture {
  name: string;
  imageName: string | null;
  price: {
    buy: Price | null;
    sell: Price | null;
  };
}
