import fs from 'fs';
import path from 'path';
import { Wiki_NamedItemWithImage } from './types';
import slugify from 'slugify';
import stream from 'stream';
import { promisify } from 'util';
import got, { HTTPError } from 'got';
const pipeline = promisify(stream.pipeline);

export const downloadWikiImages = async (
  wikiItems: Wiki_NamedItemWithImage[],
  directory: string,
) => {
  let itemsMissingImages = [];
  await Promise.all(
    wikiItems
      .filter((item) => !!item.Image?.text)
      .map(async (item) => {
        const imageName = item.Image.text.replace(/(\[\[File:|\]\])/g, '');
        const imageExtension = path.extname(imageName);
        const imageUrl = `https://animalcrossing.fandom.com/wiki/:Special:Filepath/${imageName}`;
        const localFileName = `${slugify(item.Name.text, {
          lower: true,
        })}${imageExtension}`;
        try {
          await pipeline(
            got.stream(imageUrl),
            fs.createWriteStream(path.join(directory, localFileName)),
          );
        } catch (e) {
          if (e instanceof HTTPError && e.message.includes('404')) {
            itemsMissingImages.push(item);
          } else {
            console.log(
              `[downloadWikiImages] [${e.message}] downloading ${imageUrl} for ${item.Name.text}`,
            );
          }
          fs.unlinkSync(path.join(directory, localFileName));
        }
      }),
  );
  console.log(`[downloadWikiImages] done. ${itemsMissingImages.length} items missing images`);
};
