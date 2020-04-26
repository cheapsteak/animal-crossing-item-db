import path from 'path';
import fs from 'fs-extra';
import slugify from 'slugify';
import {
  SerializedBug,
  SerializedFish,
  SerializedFurniture,
} from './../src/types';
import { Wiki_Fish, Wiki_Furniture } from './extract/types';
import { getWikiItemIconFileName } from './extract/downloadWikiImages';
import { extractionDirectory } from './extractionDirectory';
import { parsePrice } from './parsePrice';

// for now, just transform wiki data into something more suitable for app use
// and copy over images
// might have to do some data merging in the future if there's data we want
// that's outside of wikia.

const monthNames = [
  // eslint-disable-next-line prettier/prettier
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

export const ITEM_IMAGES_DIR_NAME = `item-images`;

const transformWikiFish = (wikiCritters: Wiki_Fish[]): SerializedFish[] => {
  return wikiCritters.map((wikiCritter) => {
    const imageName = getWikiItemIconFileName(
      wikiCritter.Name.text,
      path.extname(wikiCritter.Image.text.replace(/(\[\[File:|\]\])/g, '')),
    );
    const imageExists = fs.existsSync(
      path.join(extractionDirectory, 'images/fish', imageName),
    );
    return {
      slug: slugify(wikiCritter.Name.text, { lower: true }),
      name: wikiCritter.Name.text,
      imageName: imageExists
        ? `/${ITEM_IMAGES_DIR_NAME}/fish/${imageName}`
        : null,
      price: wikiCritter.Price.number,
      shadowSize: wikiCritter['Shadow size'].text,
      location: wikiCritter.Location.text,
      time: wikiCritter.Time.text,
      appearsInMonths: monthNames.filter(
        (monthName) => wikiCritter[monthName].text === '✓',
      ),
    };
  });
};

const transformWikiBugs = (wikiCritters: Wiki_Fish[]): SerializedBug[] => {
  return wikiCritters.map((wikiCritter) => {
    const imageName = getWikiItemIconFileName(
      wikiCritter.Name.text,
      path.extname(wikiCritter.Image.text.replace(/(\[\[File:|\]\])/g, '')),
    );
    const imageExists = fs.existsSync(
      path.join(extractionDirectory, 'images/bugs', imageName),
    );
    return {
      slug: slugify(wikiCritter.Name.text, { lower: true }),
      name: wikiCritter.Name.text,
      imageName: imageExists
        ? `/${ITEM_IMAGES_DIR_NAME}/bugs/${imageName}`
        : null,
      price: wikiCritter.Price.number,
      location: wikiCritter.Location.text,
      time: wikiCritter.Time.text,
      appearsInMonths: monthNames.filter(
        (monthName) => wikiCritter[monthName].text === '✓',
      ),
    };
  });
};

const transformFurniture = (
  wikiFurniture: Wiki_Furniture[],
): SerializedFurniture[] => {
  return wikiFurniture.map((wikiFurnitureItem) => {
    const imageText = wikiFurnitureItem.Image?.text || '';
    const imageName = getWikiItemIconFileName(
      wikiFurnitureItem.Name.text,
      path.extname(imageText.replace(/(\[\[File:|\]\])/g, '')),
    );
    const imageExists = fs.existsSync(
      path.join(extractionDirectory, 'images/furniture', imageName),
    );
    return {
      slug: slugify(wikiFurnitureItem.Name.text, { lower: true }),
      name: wikiFurnitureItem.Name.text,
      imageName: imageExists
        ? `/${ITEM_IMAGES_DIR_NAME}/furniture/${imageName}`
        : null,
      price: {
        buy: parsePrice(wikiFurnitureItem['Price (Buy)']?.text || ''),
        sell: parsePrice(wikiFurnitureItem['Price (Sell)']?.text || ''),
      },
    };
  });
};

const writeDataToSrc = (fileName: string, data: object) => {
  fs.writeFileSync(
    path.join(process.cwd(), 'public/data', fileName),
    JSON.stringify(data, null, '  '),
    { flag: 'w', encoding: 'utf8' },
  );
};

export const load = () => {
  fs.copySync(
    path.join(extractionDirectory, 'images'),
    path.join(process.cwd(), `public/${ITEM_IMAGES_DIR_NAME}`),
  );

  const northernHemisphereFish = transformWikiFish(
    require(path.join(extractionDirectory, `fish-northern-hemisphere.json`)),
  );
  writeDataToSrc('northernHemisphereFish.json', northernHemisphereFish);

  const southernHemisphereFish = transformWikiFish(
    require(path.join(extractionDirectory, `fish-northern-hemisphere.json`)),
  );
  writeDataToSrc('southernHemisphereFish.json', southernHemisphereFish);

  const northernHemisphereBugs = transformWikiBugs(
    require(path.join(extractionDirectory, `bugs-northern-hemisphere.json`)),
  );
  writeDataToSrc('northernHemisphereBugs.json', northernHemisphereBugs);

  const southernHemisphereBugs = transformWikiBugs(
    require(path.join(extractionDirectory, `bugs-southern-hemisphere.json`)),
  );
  writeDataToSrc('southernHemisphereBugs.json', southernHemisphereBugs);

  const furniture = transformFurniture(
    require(path.join(extractionDirectory, `furniture.json`)),
  );
  writeDataToSrc('furniture.json', furniture);
};

load();
