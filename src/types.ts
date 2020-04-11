import { Wiki_Fish } from './../scripts/extract/types';

export type Hemisphere = 'northern' | 'southern';

export interface NamedItem {
  name: string;
}
export interface SeasonalCritter extends NamedItem {
  name: string;
  imageName: string | null;
  price: number;
  location: string;
  time: string;
  // eslint-disable-next-line prettier/prettier
  appearsInMonths: ReadonlyArray<'Jan'|'Feb'|'Mar'|'Apr'|'May'|'Jun'|'Jul'|'Aug'|'Sep'|'Oct'|'Nov'|'Dec'>;
}

export interface SerializedFish extends SeasonalCritter {
  shadowSize: Wiki_Fish['Shadow size']['text'];
}

export type SerializedBug = SeasonalCritter;

export interface Price {
  amount: number;
  currency: string;
}

export interface SerializedFurniture extends NamedItem {
  name: string;
  imageName: string | null;
  price: {
    buy: Price | null;
    sell: Price | null;
  };
}

/** Data somewhat wasteful and not really necessary to store in JSON
 but is convenient to have in the app
*/
export interface HydratedItem {
  type: 'furniture' | 'bug' | 'fish';
}

export interface Bug extends HydratedItem, SerializedBug {
  type: 'bug';
}

export interface Fish extends HydratedItem, SerializedBug {
  type: 'fish';
}

export interface Furniture extends HydratedItem, SerializedFurniture {
  type: 'furniture';
}
