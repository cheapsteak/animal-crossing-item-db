import fs from 'fs';
import path from 'path';
import './extendWtfWikiepdiaWithSideEffects';
import { extractFish } from './extractFish';
import { extractBugs } from './extractBugs';
import { extractFurniture } from './extractFurniture';

const extractionDirectory = path.join(process.cwd(), 'extracted/');

export const extractEverything = async () => {
  console.log('extracting everything');
  fs.mkdirSync(extractionDirectory, { recursive: true });
  // intentionally extracting serially to keep logs easily readable
  await extractFish(extractionDirectory);
  await extractBugs(extractionDirectory);
  await extractFurniture(extractionDirectory);
  console.log('extracted everything');
};

extractEverything();
