import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import wtf from 'wtf_wikipedia';
import { Wiki_SeasonalCritter } from './types';
import { downloadWikiImages } from './downloadWikiImages';
import { extractionDirectory } from '../extractionDirectory';
import { saveExtractedItems } from './saveExtractedItems';

export const extractBugs = async () => {
  console.log('[extractBugs] starting');

  console.log('[extractBugs] fetching from wiki');
  const doc = await wtf.fetch(
    'https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)',
  );

  const northernHemisphereBugs = doc?.tables(0).json() as Array<
    Wiki_SeasonalCritter
  >;
  const southernHemisphereBugs = doc?.tables(2).json() as Array<
    Wiki_SeasonalCritter
  >;

  console.log('[extractBugs] writing json');
  saveExtractedItems(
    'bugs-northern-hemisphere',
    northernHemisphereBugs,
    (x) => x.Name.text,
  );
  saveExtractedItems(
    'bugs-southern-hemisphere',
    southernHemisphereBugs,
    (x) => x.Name.text,
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
