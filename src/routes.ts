import { HydratedItem } from './types';

export const itemDetailsRoute = (
  itemType: HydratedItem['type'] | ':itemType' = ':itemType',
  itemSlug = ':itemSlug',
) => `/${itemType}/${itemSlug}`;
