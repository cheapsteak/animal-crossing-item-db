import fs from 'fs';
import path from 'path';
import wtf from 'wtf_wikipedia';
import { Wiki_Furniture } from './types';
import { downloadWikiImages } from './downloadWikiImages';

export const extractFurniture = async (extractionDirectory: string) => {
  console.log('[extractFurniture] starting');

  console.log('[extractFurniture] fetching from wiki');
  let doc = await wtf.fetch(
    'https://animalcrossing.fandom.com/wiki/Furniture_(New_Horizons)',
  );

  const allFurniture = doc
    .tables()
    .flatMap((table) => table.json()) as Wiki_Furniture[];

  console.log('[extractFurniture] writing json');
  fs.writeFileSync(
    path.join(extractionDirectory, 'furniture.json'),
    JSON.stringify(allFurniture, null, '  '),
    { encoding: 'utf8', flag: 'w' },
  );

  console.log('[extractFurniture] creating image directory');
  const imageDirectory = path.join(extractionDirectory, 'images/furniture');
  fs.mkdirSync(imageDirectory, { recursive: true });

  console.log('[extractFurniture] downloading icons');
  await downloadWikiImages(allFurniture, imageDirectory);
  console.log('[extractFurniture] done');
};
