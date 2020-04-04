import { Wiki_Fish } from './../scripts/extract/types';
export interface SeasonalCritter {
  name: string;
  imageName: string;
  price: number;
  location: string;
  time: string;
  // eslint-disable-next-line prettier/prettier
  appearsInMonths: ReadonlyArray<'Jan'|'Feb'|'Mar'|'Apr'|'May'|'Jun'|'Jul'|'Aug'|'Sep'|'Oct'|'Nov'|'Dec'>;
}

export interface Fish extends SeasonalCritter {
  // eslint-disable-next-line prettier/prettier
  shadowSize: Wiki_Fish['Shadow size']['text'];
}
