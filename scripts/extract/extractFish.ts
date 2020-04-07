import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import wtf from 'wtf_wikipedia';
import { Wiki_SeasonalCritter } from './types';
import { downloadWikiImages } from './downloadWikiImages';
import { extractionDirectory } from '../extractionDirectory';
import { saveExtractedItems } from './saveExtractedItems';

const cleanFishData = (row: any) => {
  // sometimes Location and "Shadow Size" columns can get mixed up
  // even after fixing on the wiki, for some reason we still get the old mixed up data
  if ('number' in row?.Location && !('number' in row['Shadow size'])) {
    return {
      ...row,
      Location: row['Shadow size'],
      'Shadow size': row.Location,
    };
  } else {
    return row;
  }
};

export const extractFish = async () => {
  console.log('[extractFish] starting');

  console.log('[extractFish] fetching from wiki');
  const doc = await wtf.fetch(
    'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)',
  );

  const northernHemisphereFish = (doc?.tables(0).json() as object[]).map(
    cleanFishData,
  ) as Array<Wiki_SeasonalCritter>;
  const southernHemisphereFish = (doc?.tables(2).json() as object[]).map(
    cleanFishData,
  ) as Array<Wiki_SeasonalCritter>;
  console.log(southernHemisphereFish);

  console.log('[extractFish] writing json');
  saveExtractedItems(northernHemisphereFish, 'fish-northern-hemisphere');
  saveExtractedItems(southernHemisphereFish, 'fish-southern-hemisphere');

  const allFish = _.uniqBy(
    northernHemisphereFish.concat(southernHemisphereFish),
    (wikiFish) => wikiFish.Name.text,
  );

  console.log('[extractFish] creating image directory');
  const imageDirectory = path.join(extractionDirectory, 'images/fish');
  fs.mkdirSync(imageDirectory, { recursive: true });

  console.log('[extractFish] downloading icons');
  await downloadWikiImages(allFish, imageDirectory);
  console.log('[extractFish] done');
};
