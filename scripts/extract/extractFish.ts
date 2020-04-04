import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import wtf from 'wtf_wikipedia';
import { Wiki_SeasonalCritter } from './types';
import { downloadWikiImages } from './downloadWikiImages';

export const extractFish = async (extractionDirectory: string) => {
  console.log('[extractFish] starting');

  console.log('[extractFish] fetching from wiki');
  let doc = await wtf.fetch(
    'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)',
  );

  const northernHemisphereFish = doc?.tables(0).json() as Array<Wiki_SeasonalCritter>;
  const southernHemisphereFish = doc?.tables(2).json() as Array<Wiki_SeasonalCritter>;

  console.log('[extractFish] writing json');
  fs.writeFileSync(
    path.join(extractionDirectory, 'fish-northern-hemisphere.json'),
    JSON.stringify(northernHemisphereFish, null, '  '),
    { encoding: 'utf8', flag: 'w' },
  );
  fs.writeFileSync(
    path.join(extractionDirectory, 'fish-southern-hemisphere.json'),
    JSON.stringify(southernHemisphereFish, null, '  '),
    { encoding: 'utf8', flag: 'w' },
  );

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
