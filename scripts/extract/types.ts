type YahOrNah = {
  text: '-' | '✓';
};

export interface Wiki_NamedItemWithImage {
  Name: {
    text: string;
  };
  Image: {
    // e.g. "text": "[[File:Ribbon Eel HHD Icon.png]]"
    text: string;
  };
}

export interface Wiki_SeasonalCritter extends Wiki_NamedItemWithImage {
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
  };
  Location: {
    text: string;
  };
  'Shadow size': {
    text: string;
  };
  Time: {
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

export interface Wiki_Furniture extends Wiki_NamedItemWithImage {
  Name: { text: string };
  Image: { text: string };
  'Price (Buy)': { text: '*' | 'N/A' };
  'Price (Sell)': {
    text: '*';
    links?: Array<{
      type: 'internal';
      page: string;
    }>;
  };
  Source: { text: '*' };
  Variations: { text: '*' };
  'Customize?': { text: 'N/A' };
  Size: { text: '*' };
}

export interface SeasonalCritter {
  name: string;
  imageName: string;
  price: number;
  location: string;
  shadowSize: string;
  time: string;
  appearsInMonths: [];
}
