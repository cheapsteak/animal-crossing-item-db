/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { GridChildComponentProps } from 'react-window';

const numberFormatter = new Intl.NumberFormat();

export const ListItem: React.FC<GridChildComponentProps> = ({
  data,
  rowIndex,
  columnIndex,
  style,
}) => {
  const item = data[rowIndex][columnIndex];
  if (!item) {
    return null;
  }
  return (
    <div key={item.type + item.name} style={style}>
      <div
        css={css`
          padding-top: 4px;
          padding-bottom: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
              `}
              alt=""
            />
          )}
        </div>
        <span
          className="item-name"
          css={css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            flex-shrink: 0;
            text-align: center;
          `}
        >
          {item.name}
        </span>
        <div className="item-price">
          {item.type !== 'furniture' ? (
            <span>{numberFormatter.format(item.price)}</span>
          ) : (
            <span>
              {item.price.sell?.amount &&
                numberFormatter.format(item.price.sell?.amount)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
