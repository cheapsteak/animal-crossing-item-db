import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { extractionDirectory } from '../extractionDirectory';
import { Wiki_NamedItemWithImage } from './types';

export const saveExtractedItems = (
  wikiItems: Wiki_NamedItemWithImage[],
  name: string,
) => {
  fs.writeFileSync(
    path.join(extractionDirectory, `${name}.json`),
    JSON.stringify(
      _.sortBy(wikiItems, (x) => x.Name.text),
      null,
      '  ',
    ),
    { encoding: 'utf8', flag: 'w' },
  );
};
