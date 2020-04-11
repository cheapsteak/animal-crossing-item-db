import fs from 'fs';
import path from 'path';
import wtf from 'wtf_wikipedia';
import { Wiki_Furniture } from './types';
import { downloadWikiImages } from './downloadWikiImages';
import { extractionDirectory } from '../extractionDirectory';
import { saveExtractedItems } from './saveExtractedItems';

const cleanFurnitureData = (item: any) => {
  return {
    ...item,
    'Price (Buy)': {
      text: item['Price (Buy)']?.text.replace(
        /PC-icon-Bells-coin\.png/,
        ' Bells',
      ),
    },
  };
};

export const extractFurniture = async () => {
  console.log('[extractFurniture] starting');

  console.log('[extractFurniture] fetching from wiki');
  const doc = await wtf.fetch(
    'https://animalcrossing.fandom.com/wiki/Furniture_(New_Horizons)',
  );

  const allFurniture = doc
    ?.tables()
    .flatMap((table) => table.json())
    .map(cleanFurnitureData)
    .filter(
      (entry: any) => 'Name' in entry && entry?.Name?.text,
    ) as Wiki_Furniture[];

  console.log('[extractFurniture] writing json');
  saveExtractedItems(allFurniture, 'furniture');

  console.log('[extractFurniture] creating image directory');
  const imageDirectory = path.join(extractionDirectory, 'images/furniture');
  fs.mkdirSync(imageDirectory, { recursive: true });

  console.log('[extractFurniture] downloading icons');
  await downloadWikiImages(allFurniture, imageDirectory);
  console.log('[extractFurniture] done');
};
