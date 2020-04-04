import fs from 'fs';
import './extendWtfWikiepdiaWithSideEffects';
import { extractFish } from './extractFish';
import { extractBugs } from './extractBugs';
import { extractFurniture } from './extractFurniture';
import { extractionDirectory } from '../extractionDirectory';

export const extractEverything = async () => {
  console.log('extracting everything');
  fs.mkdirSync(extractionDirectory, { recursive: true });
  // intentionally extracting serially to keep logs easily readable
  await extractFish();
  await extractBugs();
  await extractFurniture();
  console.log('extracted everything');
};
