import fs from 'fs';
import path from 'path';
import { Wiki_NamedItemMaybeWithImage } from './types';
import slugify from 'slugify';
import stream from 'stream';
import { promisify } from 'util';
import got, { HTTPError } from 'got';
const pipeline = promisify(stream.pipeline);

/** Images on wiki tend to change and have new names.
We want a consistent way to address an item's icon
*/
export const getWikiItemIconFileName = (
  wikiItemName: string,
  extension: string,
) => {
  return `${slugify(wikiItemName, { lower: true })}${extension}`;
};

export const downloadWikiImages = async (
  wikiItems: any[],
  directory: string,
  getItemName: (item: any) => string = (
    wikiItem: Wiki_NamedItemMaybeWithImage,
  ) => wikiItem.Name.text,
  getImageName: (item: any) => string | undefined = (
    wikiItem: Wiki_NamedItemMaybeWithImage,
  ) => wikiItem.Image?.text.replace(/(\[\[File:|\]\])/g, ''),
) => {
  const itemsMissingImages = [];
  await Promise.all(
    wikiItems.flatMap(async (item) => {
      const itemName = getItemName(item);
      const imageName = getImageName(item);
      if (!imageName) {
        return [];
      }
      const imageExtension = path.extname(imageName);
      const imageUrl = `https://animalcrossing.fandom.com/wiki/:Special:Filepath/${imageName}`;
      const localImageName = getWikiItemIconFileName(itemName, imageExtension);
      const localImagePath = path.join(directory, localImageName);
      try {
        await pipeline(
          got.stream(imageUrl),
          fs.createWriteStream(localImagePath),
        );
      } catch (e) {
        if (e instanceof HTTPError && e.message.includes('404')) {
          itemsMissingImages.push(item);
        } else {
          console.log(
            `[downloadWikiImages] [${e.message}] downloading ${imageUrl} for ${itemName}`,
          );
        }
        fs.unlinkSync(localImagePath);
      }
    }),
  );
  console.log(
    `[downloadWikiImages] done. ${itemsMissingImages.length} items missing images`,
  );
};
