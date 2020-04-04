import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import { extractionDirectory } from './extractionDirectory';

const loadExtractedJson = (fileName: string) =>
  JSON.parse(fs.readFileSync(path.join(extractionDirectory, fileName), 'utf8'));

const dataToValidate = [
  {
    name: 'bugs-northern-hemisphere',
    items: loadExtractedJson('bugs-northern-hemisphere.json'),
    schema: loadExtractedJson('bugs-schema.json'),
  },

  {
    name: 'bugs-southern-hemisphere',
    items: loadExtractedJson('bugs-southern-hemisphere.json'),
    schema: loadExtractedJson('bugs-schema.json'),
  },

  {
    name: 'fish-northern-hemisphere',
    items: loadExtractedJson('fish-northern-hemisphere.json'),
    schema: loadExtractedJson('fish-schema.json'),
  },
  {
    name: 'fish-southern-hemisphere',
    items: loadExtractedJson('fish-southern-hemisphere.json'),
    schema: loadExtractedJson('fish-schema.json'),
  },

  {
    name: 'furniture',
    items: loadExtractedJson('furniture.json'),
    schema: loadExtractedJson('furniture-schema.json'),
  },
];

const ajv = new Ajv();

export const validationResults = dataToValidate.map(
  ({ name, items, schema }) => {
    return {
      name,
      items: items.map((item: any) => {
        return {
          item,
          isValid: ajv.validate(schema, item),
          errors: ajv.errors,
        };
      }),
    };
  },
);

dataToValidate.forEach(({ name, items, schema }) => {
  const invalidItems = items
    .map((item: any) => {
      return {
        item,
        isValid: ajv.validate(schema, item),
        errors: ajv.errors,
      };
    })
    .filter((item: any) => !item.isValid);
  test(name, () => {
    expect(invalidItems).toEqual([]);
  });
});
