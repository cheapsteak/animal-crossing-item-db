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
  wikiItems: Wiki_NamedItemMaybeWithImage[],
  directory: string,
) => {
  const itemsMissingImages = [];
  await Promise.all(
    wikiItems
      .filter((item) => !!item.Image?.text)
      .map(async (item) => {
        const imageText = item.Image?.text as string;
        const imageName = imageText.replace(/(\[\[File:|\]\])/g, '');
        const imageExtension = path.extname(imageName);
        const imageUrl = `https://animalcrossing.fandom.com/wiki/:Special:Filepath/${imageName}`;
        const localImageName = getWikiItemIconFileName(
          item.Name.text,
          imageExtension,
        );
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
              `[downloadWikiImages] [${e.message}] downloading ${imageUrl} for ${item.Name.text}`,
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
