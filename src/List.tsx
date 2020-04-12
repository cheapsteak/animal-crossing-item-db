/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { ListItem } from './ListItem';
import { Furniture, Fish, Bug } from './types';

export const List: React.FC<{ items: Array<Furniture | Fish | Bug> }> = ({
  items,
}) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          itemData={items}
          itemCount={items.length}
          height={height}
          width={width}
          itemSize={40}
        >
          {ListItem}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};
