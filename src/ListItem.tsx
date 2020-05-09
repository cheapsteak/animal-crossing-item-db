/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { motion } from 'framer-motion';
import React from 'react';
import { GridChildComponentProps } from 'react-window';
import { Link, useLocation, matchPath } from 'react-router-dom';

import { itemDetailsRoute } from './routes';
import { numberFormatter } from './numberFormatter';

export const ListItem: React.FC<GridChildComponentProps> = ({
  data,
  rowIndex,
  columnIndex,
  style,
}) => {
  const item = data[rowIndex][columnIndex];
  const location = useLocation();
  const match = matchPath(location.pathname, {
    path: itemDetailsRoute(item.type, item.slug),
    exact: true,
  });

  if (!item) {
    return null;
  }
  return (
    <Link
      key={item.type + item.name}
      to={match ? '/' : itemDetailsRoute(item.type, item.slug)}
      style={style}
      css={css`
        position: relative;
        font-size: 14px;
        text-decoration: none;
        color: #222;

        border-radius: 4px;
        /* disable blue flash */
        -webkit-tap-highlight-color: rgba(11, 162, 60, 0.1);
      `}
    >
      <motion.div
        layoutId="item-wrapper"
        css={css`
          padding-top: 4px;
          padding-bottom: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        `}
      >
        <div
          css={css`
            width: 50px;
            min-height: 50px;
          `}
        >
          {item.imageName && (
            <img
              src={`${item.imageName}`}
              css={css`
                width: 100%;
                height: 50px;
                object-fit: contain;
              `}
              alt=""
            />
          )}
        </div>
        <span
          className="item-name"
          css={css`
            flex-shrink: 0;
            text-align: center;

            font-weight: 500;
            margin-bottom: 2px;

            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            ${item.name.length > 16 &&
            css`
              font-size: 12px;
            `}
          `}
        >
          {item.name}
        </span>
        <div css={css``}>
          {item.type !== 'furniture' ? (
            <span>{numberFormatter.format(item.price)}</span>
          ) : (
            <span>
              {item.price.sell?.amount &&
                numberFormatter.format(item.price.sell?.amount)}
            </span>
          )}
        </div>
      </motion.div>
    </Link>
  );
};
