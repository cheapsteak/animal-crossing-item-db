/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { motion } from 'framer-motion';
import { Fish, Bug } from '../types';
import { monthCodes } from '../constants';
import { numberFormatter } from '../numberFormatter';

export const CritterDetails: React.FC<{ critter: Fish | Bug }> = ({
  critter,
}) => {
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
              align-self: center;
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
              margin-top: 20px;
              margin-bottom: 16px;
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
              margin-bottom: 8px;
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
          margin-bottom: 16px;
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
