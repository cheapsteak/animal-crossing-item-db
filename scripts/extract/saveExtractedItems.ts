import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { extractionDirectory } from '../extractionDirectory';

export const saveExtractedItems = <T>(
  categoryName: string,
  wikiItems: T[],
  getItemName: (item: T) => string,
) => {
  fs.writeFileSync(
    path.join(extractionDirectory, `${categoryName}.json`),
    JSON.stringify(_.sortBy(wikiItems, getItemName), null, '  '),
    { encoding: 'utf8', flag: 'w' },
  );
};
