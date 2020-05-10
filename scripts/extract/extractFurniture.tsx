import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import wtf from 'wtf_wikipedia';
import { Wiki_Furniture } from './types';
import { downloadWikiImages } from './downloadWikiImages';
import { extractionDirectory } from '../extractionDirectory';
import { saveExtractedItems } from './saveExtractedItems';

const cleanFurnitureData = (item: any) => {
  return _.omit(
    {
      ...item,
      buy: item.buy?.replace(/PC-icon-Bells-coin\.png/, ' Bells'),
      name: item.list[0],
    },
    ['list'],
  );
};

export const extractFurniture = async () => {
  console.log('[extractFurniture] starting');

  console.log('[extractFurniture] fetching from wiki');
  const housewaresDoc = await wtf.fetch(
    'https://animalcrossing.fandom.com/wiki/Furniture_(New_Horizons)/Housewares',
  );

  const miscellaneousDoc = await wtf.fetch(
    'https://animalcrossing.fandom.com/wiki/Furniture_(New_Horizons)/Miscellaneous',
  );
  const wallMountedDoc = await wtf.fetch(
    'https://animalcrossing.fandom.com/wiki/Furniture_(New_Horizons)/Wall-mounted',
  );
  const wallpaperDoc = await wtf.fetch(
    'https://animalcrossing.fandom.com/wiki/Furniture_(New_Horizons)/Wallpaper',
  );
  const flooringDoc = await wtf.fetch(
    'https://animalcrossing.fandom.com/wiki/Furniture_(New_Horizons)/Flooring',
  );
  const rugsDoc = await wtf.fetch(
    'https://animalcrossing.fandom.com/wiki/Furniture_(New_Horizons)/Rugs',
  );

  const allFurniture = [
    housewaresDoc,
    miscellaneousDoc,
    wallMountedDoc,
    wallpaperDoc,
    flooringDoc,
    rugsDoc,
  ]
    .flatMap((doc) => {
      // console.log(doc?.templates());
      return doc
        ?.templates()
        .filter(
          (x) =>
            (x as any).template.startsWith('itemlist/nh/furniture') &&
            (x as any).list.length,
        );
    })
    .map(cleanFurnitureData) as Wiki_Furniture[];

  console.log('[extractFurniture] writing json');
  saveExtractedItems('furniture', allFurniture, (x) => x.name);

  console.log('[extractFurniture] creating image directory');
  const imageDirectory = path.join(extractionDirectory, 'images/furniture');
  fs.mkdirSync(imageDirectory, { recursive: true });

  console.log('[extractFurniture] downloading icons');
  // images will be at https://animalcrossing.fandom.com/wiki/:Special:Filepath/NH-Furniture-{item name}.png
  await downloadWikiImages(
    allFurniture,
    imageDirectory,
    (item) => item.name,
    (item) => 'NH-Furniture-' + encodeURIComponent(item.name) + '.png',
  );
  console.log('[extractFurniture] done');
};
