/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { motion } from 'framer-motion';
import { Furniture } from '../types';
import { numberFormatter } from '../numberFormatter';

export const FurnitureDetails: React.FC<{ item: Furniture }> = ({ item }) => {
  return (
    <motion.div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          margin-left: 20px;
        `}
      >
        {item.imageName && (
          <img
            src={`${item.imageName}`}
            css={css`
              width: 60px;
              height: 50px;
              object-fit: contain;
              align-self: center;
              margin-top: 10px;
              margin-bottom: 10px;
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
            margin-bottom: 16px;
          `}
        >
          <h1
            css={css`
              display: flex;
              flex-grow: 1;
              flex-direction: row;
              margin-right: 20px;
              margin-top: 16px;
              margin-bottom: 8px;
              font-size: 20px;
              font-weight: 500;
            `}
          >
            {item.name}
          </h1>
          {item.price.sell && (
            <div
              css={css`
                display: flex;
                font-size: 14px;
                font-weight: 500;
                margin-right: 20px;
                color: #333;
              `}
            >
              Selling Price:
              <span
                css={css`
                  margin-left: auto;
                `}
              >
                {numberFormatter.format(item.price.sell.amount)}
              </span>
            </div>
          )}
          {item.price.buy && (
            <div
              css={css`
                display: flex;
                font-size: 14px;
                font-weight: 500;
                margin-right: 20px;
                color: #333;
                margin-top: 6px;
              `}
            >
              Purchase Price:
              <span
                css={css`
                  margin-left: auto;
                `}
              >
                {numberFormatter.format(item.price.buy.amount)}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
