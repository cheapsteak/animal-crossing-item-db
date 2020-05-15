/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useMemo } from 'react';

import { GoSearch } from 'react-icons/go';

import { useItemsDataContext } from './useItemsDataContext';
import { Furniture, Fish, Bug } from './types';
import { List } from './List';

export const HomePage = () => {
  const { furniture, fish, bugs } = useItemsDataContext();
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
      <div>
        <Searchbox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
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

const Searchbox: React.FC<{
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
      `}
    >
      <div
        css={css`
          border-radius: 25px;
          border: 1px solid #ccc;
          opacity: 1;
          margin: 0.5em;
          width: 100%;
          display: flex;
        `}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          css={css`
            flex-grow: 1;
            background-color: transparent;
            border: transparent;
            font-size: 16px;
            padding: 0.5em;
            padding-left: 34px;
          `}
        />
      </div>
      <div
        css={css`
          position: absolute;
          top: 18px;
          left: 18px;
          pointer-events: none;
          /* transform: translateZ(0); */
        `}
      >
        <GoSearch
          css={{
            width: 18,
            height: 'auto',
          }}
        />
      </div>
    </div>
  );
};
