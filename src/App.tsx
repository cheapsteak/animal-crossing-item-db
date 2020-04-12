/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { Suspense, useState, useMemo } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { useItemsData } from './useItemsData';
import { Furniture, Fish, Bug } from './types';

const numberFormatter = new Intl.NumberFormat();

const ItemRenderer: React.FC<ListChildComponentProps> = ({
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

const Foo = () => {
  const { furniture, fish, bugs } = useItemsData({ hemisphere: 'northern' });
  const [searchQuery, setSearchQuery] = useState('');

  const queryRegex = useMemo(() => {
    return new RegExp(
      '(?:[\\s]|^)' + // don't start match in the middle of a word
        // e.g. searchQuery is `aqua wall`, match `aqua tile wall`
        searchQuery
          .split(' ')
          // assume subsequent words in search are also the start of words
          .join('.*\\s'),
      'i',
    );
  }, [searchQuery]);

  const searchResults = useMemo(() => {
    const allItems: Array<Furniture | Fish | Bug> = [
      ...bugs,
      ...fish,
      ...furniture,
    ];
    return allItems.filter((item) => queryRegex.test(item.name));
  }, [queryRegex, furniture, fish, bugs]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        css={css`
          padding: 0.5em;
          margin: 0.5em;
          border-radius: 3px;
          border: 1px solid #ccc;
        `}
      />
      <div
        css={css`
          flex-grow: 1;
        `}
      >
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              itemData={searchResults}
              itemCount={searchResults.length}
              height={height}
              width={width}
              itemSize={40}
            >
              {ItemRenderer}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

const GlobalSuspenseFallback = () => {
  return <div>Loading...</div>;
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={<GlobalSuspenseFallback />}>
        <Foo />
      </Suspense>
    </div>
  );
}

export default App;
