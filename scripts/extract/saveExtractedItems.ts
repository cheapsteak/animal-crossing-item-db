import fs from 'fs';
import path from 'path';
import { extractionDirectory } from '../extractionDirectory';
import { Wiki_NamedItemWithImage } from './types';

export const saveExtractedItems = (
  wikiItems: Wiki_NamedItemWithImage[],
  name: string,
) => {
  fs.writeFileSync(
    path.join(extractionDirectory, `${name}.json`),
    JSON.stringify(wikiItems, null, '  '),
    { encoding: 'utf8', flag: 'w' },
  );
};
