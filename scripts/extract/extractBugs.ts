import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import wtf from 'wtf_wikipedia';
import { Wiki_SeasonalCritter } from './types';
import { downloadWikiImages } from './downloadWikiImages';
import { extractionDirectory } from '../extractionDirectory';

export const extractBugs = async () => {
  console.log('[extractBugs] starting');

  console.log('[extractBugs] fetching from wiki');
  let doc = await wtf.fetch(
    'https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)',
  );

  const northernHemisphereBugs = doc?.tables(0).json() as Array<
    Wiki_SeasonalCritter
  >;
  const southernHemisphereBugs = doc?.tables(2).json() as Array<
    Wiki_SeasonalCritter
  >;

  console.log('[extractBugs] writing json');
  fs.writeFileSync(
    path.join(extractionDirectory, 'bugs-northern-hemisphere.json'),
    JSON.stringify(northernHemisphereBugs, null, '  '),
    { encoding: 'utf8', flag: 'w' },
  );
  fs.writeFileSync(
    path.join(extractionDirectory, 'bugs-southern-hemisphere.json'),
    JSON.stringify(southernHemisphereBugs, null, '  '),
    { encoding: 'utf8', flag: 'w' },
  );

  const allBugs = _.uniqBy(
    northernHemisphereBugs.concat(southernHemisphereBugs),
    (bug) => bug.Name.text,
  );

  console.log('[extractBugs] creating image directory');
  const imageDirectory = path.join(extractionDirectory, 'images/bugs');
  fs.mkdirSync(imageDirectory, { recursive: true });

  console.log('[extractBugs] downloading icons');
  await downloadWikiImages(allBugs, imageDirectory);
  console.log('[extractBugs] done');
};
