/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { ListChildComponentProps } from 'react-window';

const numberFormatter = new Intl.NumberFormat();

export const ListItem: React.FC<ListChildComponentProps> = ({
  data,
  index,
  style,
}) => {
  const x = data[index];
  return (
    <div key={x.type + x.name} style={style}>
      <div
        css={css`
          height: 40px;
          padding: 0.5em 1em;
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            width: 40px;
          `}
        >
          {x.imageName && (
            <img
              src={`${x.imageName}`}
              css={css`
                width: 32px;
              `}
              alt=""
            />
          )}
        </div>
        <span>{x.name}</span>
        <div
          css={css`
            margin-left: auto;
          `}
        >
          {x.type !== 'furniture' ? (
            <span>{numberFormatter.format(x.price)}</span>
          ) : (
            <span>
              {x.price.sell?.amount &&
                numberFormatter.format(x.price.sell?.amount)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
