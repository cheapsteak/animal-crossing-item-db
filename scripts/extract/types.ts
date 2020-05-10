/* eslint-disable @typescript-eslint/class-name-casing */
type YahOrNah = {
  text: '-' | '✓';
};

export interface Wiki_NamedItemMaybeWithImage {
  Name: {
    text: string;
  };
  Image?: {
    // e.g. "text": "[[File:Ribbon Eel HHD Icon.png]]"
    text: string;
  };
}

export interface Wiki_SeasonalCritter extends Wiki_NamedItemMaybeWithImage {
  Name: {
    text: string;
    links?: Array<{
      type: 'internal' | 'external';
      page: string;
    }>;
  };
  Image: {
    // e.g. "text": "[[File:Ribbon Eel HHD Icon.png]]"
    text: string;
  };
  Price: {
    text: string;
    number: number;
  };
  Location: {
    text: string;
  };
  Time: {
    // 'All day',
    // 'X AM - Y PM',
    // 'X PM - Y AM',
    // 'X AM - Y PM & A PM - B AM',
    text: string;
  };
  Jan: YahOrNah;
  Feb: YahOrNah;
  Mar: YahOrNah;
  Apr: YahOrNah;
  May: YahOrNah;
  Jun: YahOrNah;
  Jul: YahOrNah;
  Aug: YahOrNah;
  Sep: YahOrNah;
  Oct: YahOrNah;
  Nov: YahOrNah;
  Dec: YahOrNah;
}

export type Wiki_Bug = Wiki_SeasonalCritter;
export interface Wiki_Fish extends Wiki_SeasonalCritter {
  'Shadow size': {
    // eslint-disable-next-line prettier/prettier
    text: '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'Narrow'|'6 (Fin)'|'4 (Fin)';
    number?: number;
  };
}

export interface Wiki_Furniture {
  name: string;
  buy?: string;
  sell: string;
  source?: string;
  variations?: string;
  custom?: string;
  size?: string;
  template: string;
}
