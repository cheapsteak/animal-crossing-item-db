/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { HydratedItem, Fish, Bug, Furniture } from '../types';
import { useItemsDataContext } from '../useItemsDataContext';
import { CritterDetails } from './CritterDetails';
import { FurnitureDetails } from './FurnitureDetails';

const isCritter = (x: Furniture | Bug | Fish): x is Fish | Bug =>
  x.type === 'bug' || x.type === 'fish';

class ItemNotFoundError extends Error {}
class InvalidItemTypeError extends Error {}

export const ItemDetails: React.FC<{
  itemType: HydratedItem['type'];
  itemSlug: string;
}> = ({ itemType, itemSlug }) => {
  const { bugs, fish, furniture } = useItemsDataContext();
  const item = React.useMemo(() => {
    let item;
    switch (itemType) {
      case 'bug':
        item = bugs.find((x) => x.slug === itemSlug);
        break;
      case 'fish':
        item = fish.find((x) => x.slug === itemSlug);
        break;
      case 'furniture':
        item = furniture.find((x) => x.slug === itemSlug);
        break;
      default:
        throw new InvalidItemTypeError(`Invalid itemType "${itemType}"`);
    }
    if (!item) {
      throw new ItemNotFoundError(`Item not found for slug ${itemSlug}`);
    }
    return item;
  }, [itemType, itemSlug, bugs, fish, furniture]);
  return (
    <React.Fragment>
      {isCritter(item) ? (
        <CritterDetails critter={item} />
      ) : (
        <FurnitureDetails item={item} />
      )}
    </React.Fragment>
  );
};
