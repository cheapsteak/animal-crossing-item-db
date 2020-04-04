import { extractionDirectory } from './extractionDirectory';
import fs from 'fs';
import path from 'path';
import * as TJS from 'typescript-json-schema';

const settings: TJS.PartialArgs = {
  required: true,
};

const program = TJS.getProgramFromFiles([
  path.resolve(__dirname, './extract/types.ts'),
]);

const generator = TJS.buildGenerator(program, settings);

const wikiBugSchema = generator?.getSchemaForSymbol('Wiki_Bug');
const wikiFishSchema = generator?.getSchemaForSymbol('Wiki_Fish');
const wikiFurniture = generator?.getSchemaForSymbol('Wiki_Furniture');

fs.writeFileSync(
  path.join(extractionDirectory, 'bugs-schema.json'),
  JSON.stringify(wikiBugSchema, null, ' '),
  { flag: 'w', encoding: 'utf8' },
);

fs.writeFileSync(
  path.join(extractionDirectory, 'fish-schema.json'),
  JSON.stringify(wikiFishSchema, null, ' '),
  { flag: 'w', encoding: 'utf8' },
);

fs.writeFileSync(
  path.join(extractionDirectory, 'furniture-schema.json'),
  JSON.stringify(wikiFurniture, null, ' '),
  { flag: 'w', encoding: 'utf8' },
);
