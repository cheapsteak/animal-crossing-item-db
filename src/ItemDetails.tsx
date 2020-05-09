/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HydratedItem, Fish, Bug, Furniture } from './types';
import { useItemsDataContext } from './useItemsDataContext';
import { monthCodes } from './constants';

const isCritter = (x: Furniture | Bug | Fish): x is Fish | Bug =>
  x.type === 'bug' || x.type === 'fish';

class ItemNotFoundError extends Error {}
class InvalidItemTypeError extends Error {}

const numberFormatter = new Intl.NumberFormat();

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
      {isCritter(item) ? <CritterDetails critter={item} /> : 'todo'}
    </React.Fragment>
  );
};

export const ItemDetailsWrapper: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <Link
      to="/"
      css={css`
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        text-decoration: none;
        color: #222;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        /* disable blue flash */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
      `}
    >
      <motion.div
        initial={{ opacity: 0, y: '10%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '10%' }}
        transition={{
          opacity: {
            duration: 0.1,
            ease: 'linear',
          },
          y: {
            duration: 0.15,
            ease: ['circOut', 'circIn'],
          },
        }}
        css={css`
          background-color: #ffffff;
          box-shadow: 0 0px 40px 2px rgba(0, 0, 0, 0.2);
        `}
      >
        {children}
      </motion.div>
    </Link>
  );
};

const CritterDetails: React.FC<{ critter: Fish | Bug }> = ({ critter }) => {
  return (
    <motion.div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        {critter.imageName && (
          <img
            src={`${critter.imageName}`}
            css={css`
              width: 60px;
              height: 50px;
              object-fit: contain;
              margin-top: 10px;
              margin-left: 20px;
              margin-right: 20px;
            `}
            alt=""
          />
        )}
        <div
          css={css`
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          `}
        >
          <h1
            css={css`
              display: flex;
              flex-grow: 1;
              flex-direction: row;
              margin-right: 20px;
              margin-top: 16px;
              margin-bottom: 10px;
              font-size: 20px;
              font-weight: 500;
            `}
          >
            {critter.name}
            <span
              css={css`
                margin-left: auto;
              `}
            >
              {numberFormatter.format(critter.price)}
            </span>
          </h1>
          <div
            css={css`
              display: flex;
              font-size: 14px;
              font-weight: 500;
              color: #333;
            `}
          >
            <span css={css``}>{critter.time}</span>
            <span
              css={css`
                margin-left: auto;
                margin-right: 20px;
              `}
            >
              {critter.location}
            </span>
          </div>
        </div>
      </div>

      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin-left: 20px;
          margin-right: 20px;
          margin-bottom: 10px;
          margin-top: 10px;
          font-size: 14px;
        `}
      >
        {monthCodes.map((monthCode) => (
          <div
            key={monthCode}
            css={css`
              ${!critter.appearsInMonths.includes(monthCode)
                ? css`
                    color: #aaa;
                  `
                : css`
                    color: #333;
                  `}
              font-weight: 400;
            `}
          >
            {monthCode}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
