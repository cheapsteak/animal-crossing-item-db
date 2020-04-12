/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Suspense, useState, useMemo } from 'react';

import { useItemsData } from './useItemsData';
import { Furniture, Fish, Bug } from './types';
import { List } from './List';

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
        <List items={searchResults} />
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
