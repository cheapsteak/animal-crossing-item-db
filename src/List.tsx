/** @jsx jsx */
import { jsx } from '@emotion/core';
import _ from 'lodash';
import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { ListItem } from './ListItem';
import { Furniture, Fish, Bug } from './types';

const approximateColumnSize = 90;

export const List: React.FC<{ items: Array<Furniture | Fish | Bug> }> = ({
  items,
}) => {
  return (
    <AutoSizer>
      {({ height: containerHeight, width: containerWidth }) => {
        const columnWidth =
          containerWidth /
          Math.max(3, Math.floor(containerWidth / approximateColumnSize));
        const rowHeight = Math.max(columnWidth + 20, 100);
        const columnsInView = Math.floor(containerWidth / columnWidth);
        const chunkedItems = _.chunk(items, columnsInView);
        return (
          <FixedSizeGrid
            itemData={chunkedItems}
            columnWidth={columnWidth}
            columnCount={columnsInView}
            rowHeight={rowHeight}
            rowCount={chunkedItems.length}
            height={containerHeight}
            width={containerWidth}
            itemKey={({ data, columnIndex, rowIndex }) =>
              data[rowIndex][columnIndex]?.name || `${rowIndex}-${columnIndex}`
            }
          >
            {ListItem}
          </FixedSizeGrid>
        );
      }}
    </AutoSizer>
  );
};
