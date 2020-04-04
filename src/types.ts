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
  shadowSize: '1'|'2'|'3'|'4'|'5'|'6'|'Narrow'|'6 (Fin)'|'4 (Fin)';
}
