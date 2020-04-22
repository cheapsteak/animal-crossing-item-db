/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState } from 'react';
import { GridChildComponentProps } from 'react-window';

const numberFormatter = new Intl.NumberFormat();

export const ListItem: React.FC<GridChildComponentProps> = ({
  data,
  rowIndex,
  columnIndex,
  style,
}) => {
  const [mode, setMode] = useState<'icon' | 'detailed'>('icon');
  const item = data[rowIndex][columnIndex];
  if (!item) {
    return null;
  }
  return (
    <div
      key={item.type + item.name}
      style={style}
      css={css`
        position: relative;
        font-size: 14px;
        ${mode === 'detailed' &&
        css`
          z-index: 1;
        `}
      `}
    >
      <div
        css={css`
          padding-top: 4px;
          padding-bottom: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 50%;

          ${mode === 'detailed' &&
          css`
            background-color: #51b2a8;
            color: #fffff5;
          `}
        `}
        onClick={() => setMode(mode === 'icon' ? 'detailed' : 'icon')}
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

            font-weight: ${mode === 'icon' ? '500' : '600'};
            margin-bottom: 2px;

            ${mode === 'icon' &&
            css`
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              ${item.name.length > 16 &&
              css`
                font-size: 11px;
              `}
            `}
            ${mode === 'detailed' &&
            css`
              text-shadow: 2px 2px #51b2a8;
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
      </div>
    </div>
  );
};
